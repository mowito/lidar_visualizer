#!/usr/bin/env python3

import pygame
from classes import Wall, Button, Ray
import math

# --- CUSTOMIZABLE VARIABLES ---
number_of_rays = 360 # Max 360
wall_thicknes = 2
boundarySpacing = 20
# ------------------------------


# Setup
pygame.init()
size = (1500, 1500)
menuSize = (90, 80)
surface = pygame.display.set_mode(size, pygame.RESIZABLE)
menuSurface = pygame.Surface(menuSize)
pygame.display.set_caption("Rays")
font = pygame.font.SysFont("monospace", 15)
active = False
text = ''
done = False

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 50, 50)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 50)
SNOW = (255,250,250)

# Game variables
walls = []
rays = []
drawing = False
wall_starting_pos = (0, 0)
play = False
carryOn = True
clock = pygame.time.Clock()
givenangle = 3
prev = False

# --- INITIAL SETUP ---

# Buttons
resetButton = Button(10, size[1]-menuSize[1]+10, 70, 25, 'Reset', RED)
playButton = Button(10, resetButton.y + 10 + resetButton.height, 70, 25, 'Play', GREEN)
#Text box
font1 = pygame.font.Font('freesansbold.ttf', 15)
text1 = font1.render('Angle(in degrees):',True,WHITE,None)
textRect = text1.get_rect()
textRect.center = (100,40)
input_box = pygame.Rect(textRect.right+10, 30, 140, 32)
color_inactive = pygame.Color(GREEN)
color_active = pygame.Color(SNOW)
color = color_inactive


# Boundaries
def addBoundaries():

    walls.insert(0, Wall((boundarySpacing, boundarySpacing), (size[0] - boundarySpacing, boundarySpacing)))
    walls.insert(0, Wall((boundarySpacing, boundarySpacing), (boundarySpacing, size[1] - boundarySpacing)))
    walls.insert(0, Wall((boundarySpacing, size[1] - boundarySpacing), (size[0] - boundarySpacing, size[1] - boundarySpacing)))
    walls.insert(0, Wall((size[0] - boundarySpacing, size[1] - boundarySpacing), (size[0] - boundarySpacing, boundarySpacing)))

addBoundaries()
#print(walls)
# Draw Menu
def drawMenu():
    # Set color and transparency of the menu box
    menuSurface.fill(WHITE)
    menuSurface.set_alpha(126)

    # Draw menu box
    surface.blit(menuSurface, (0, size[1]-menuSize[1]))

    # Draw buttons
    resetButton.draw(surface)
    playButton.draw(surface)



# -------- Main Program Loop -----------
while carryOn:
    
    # --- MAIN EVENT LOOP ---
    for event in pygame.event.get(): 
        # If user wants to leave
        if event.type == pygame.QUIT:
            carryOn = False
            done = True
        # User has changed the size of a window
        if event.type == pygame.VIDEORESIZE:
            size = (event.w, event.h)
            surface = pygame.display.set_mode(size, pygame.RESIZABLE)
            
            # Change boundaries
            walls = walls[4:]
            addBoundaries()

            # Change buttons
            resetButton.y = size[1]-menuSize[1]+10
            playButton.y = resetButton.y + 10 + resetButton.height
        #User has clicked text button
        if event.type == pygame.MOUSEBUTTONDOWN:
            #if user clicked on input_box rect
            if input_box.collidepoint(event.pos):

                active = not active
            else:
                active = False
            color = color_active if active else color_inactive

        if event.type == pygame.KEYDOWN:
            if active:
                if event.key == pygame.K_RETURN or event.key == pygame.K_KP_ENTER:
                    try:
                        givenangle = int(text)
                    except :
                        text = ''

                elif event.key == pygame.K_BACKSPACE:
                    text = text[:-1]
                else:
                    text += event.unicode
        # User has clicked mouse button
        if event.type == pygame.MOUSEBUTTONUP:
            pos = pygame.mouse.get_pos()
            
            if event.button == 1: #Left click
                # Check if user clicked on one of the buttons
                if resetButton.clicked(pos):
                    walls = []
                    addBoundaries()
                    if prev:
                        prev.color = WHITE
                        givenangle = 3
                    givenangle = 3
                    text = ''
                elif playButton.clicked(pos):
                    # Change status of play button
                    if play:
                        playButton.color = GREEN
                        playButton.text = 'Play'
                    else:
                        playButton.color = YELLOW
                        playButton.text = 'Stop'
                    
                    drawing = False
                    play = not play
                elif not play:  # Drawing a wall
                    if input_box.x<=pos[0]<=input_box.x+input_box.width and input_box.y<=pos[1]<= input_box.y+input_box.height:
                        continue
                    # Check if user is already drawing a wall
                    if drawing:
                        # Finish drawing and add a new wall
                        drawing = False
                        walls.append(Wall(wall_starting_pos, pos))
                    else:
                        # Start drawing
                        drawing = True
                        wall_starting_pos = pos




            
            elif event.button == 3: # Right Click
                drawing = False
 
    # --- GAME LOGIC ---
    
    # Calculate new rays
    if play:
        rays = []

        for angle in range(0, 360, givenangle):
            # Create a new ray
            ray = Ray(pygame.mouse.get_pos(), angle)

            closest = 100000000000000000000000000 # Very big number
            # Check every wall
            for wall in walls:
                x1, y1 = ray.start_pos
                x2, y2 = ray.end_point

                x3, y3 = wall.A
                x4, y4 = wall.B

                # Magical formula from wikipedia https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
                div = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4)
                if div == 0:
                    # Parallel
                    continue
                
                t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/div
                u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/div

                # Check if there is an intersection point
                if 0.0 < t and u > 0.0 and u < 1:
                    point = (int(x1 + t*(x2 - x1)), int(y1 + t*(y2 - y1)))
                    distance = ((point[0] - ray.start_pos[0])**2 + (point[1] - ray.start_pos[1])**2)**(1/2)

                    # Check if this is the closest wall
                    if closest > distance:
                        ray.end_point = point
                        closest = distance

            rays.append(ray)


    # --- DRAWING ---
    surface.fill(BLACK)
    surface.blit(text1,textRect)
    #render the input text
    txt_surface = font.render(text, True, color)

    #resize the box if box is too long
    width = max(200,txt_surface.get_width()+10)
    input_box.w = width
    # Blit the text.
    surface.blit(txt_surface, (input_box.x + 5, input_box.y + 5))
    pygame.draw.rect(surface,color,input_box,2)
    # Draw currently constructing wall
    if drawing:
        pygame.draw.line(surface, WHITE, wall_starting_pos, pygame.mouse.get_pos(), wall_thicknes)
    
    # Draw existing walls
    for wall in walls:
        pygame.draw.line(surface, WHITE, wall.A, wall.B, wall_thicknes)

    # Draw player and rays
    if play:
        pygame.draw.circle(surface, WHITE, pygame.mouse.get_pos(), 10)

        for ray in rays:
            pygame.draw.line(surface, WHITE, ray.start_pos, ray.end_point, 1)

    # Draw menu and all buttons
    drawMenu()
    #drawMenu2()
    # --- UPDATE THE SCREEN ---
    pygame.display.flip()

    clock.tick(60)
 
pygame.quit()

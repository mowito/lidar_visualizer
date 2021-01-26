#!/usr/bin/env python3

import pygame
from classes import Wall, Button, Ray,InputBox
import math

# --- CUSTOMIZABLE VARIABLES ---

wall_thicknes = 2
boundarySpacing = 30
# ------------------------------


# Setup
pygame.init()
size = (800, 800)
menuSize = (90, 80)
surface = pygame.display.set_mode(size, pygame.RESIZABLE)
menuSurface = pygame.Surface(menuSize)
pygame.display.set_caption("Rays")
font = pygame.font.SysFont("monospace", 15)
active = False
active2 = False
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
resetButton = Button(size[0]-menuSize[0]+10,10, 70, 25, 'Reset', RED)
playButton = Button(size[0]-menuSize[0]+10, resetButton.y+10+resetButton.height, 70, 25, 'Play', GREEN)

#Text box
font1 = pygame.font.Font('freesansbold.ttf', 15)
text1 = font1.render('Angle(in degrees):',True,WHITE,None)
textRect = text1.get_rect()
textRect.center = (boundarySpacing+70,50)
text2 = font1.render('Range of rays(0-250m):',True,WHITE,None)
text2Rect = text2.get_rect()
text2Rect.center = (boundarySpacing+90,textRect.centery+50)
input_box = InputBox(textRect.right+10, boundarySpacing+10, 60, 32)
input_box2 = InputBox(text2Rect.right+10,80,60,32)
input_boxes = [input_box,input_box2]
#Text box for graph edges in x axis
graphbox1 = font1.render('0 m ',True,WHITE,None)
graphbox1Rect = graphbox1.get_rect()
graphbox1Rect.center = (boundarySpacing,size[1]-boundarySpacing+10)
graphbox2 = font1.render('250 m ',True,WHITE,None)
graphbox2Rect =graphbox2.get_rect()
graphbox2Rect.center = (boundarySpacing+((size[0]-2*boundarySpacing)/2),size[1]-boundarySpacing+10)
graphbox3 = font1.render('500 m',True,WHITE,None)
graphbox3Rect = graphbox3.get_rect()
graphbox3Rect.center = ((boundarySpacing+(size[0]-2*boundarySpacing)),size[1]-boundarySpacing+10)
graphbox6 = font1.render('125 m',True,WHITE,None)
graphbox6Rect = graphbox6.get_rect()
graphbox6Rect.center = (boundarySpacing+((size[0]-2*boundarySpacing)/4),size[1]-boundarySpacing+10)
graphbox7 = font1.render('375 m',True,WHITE,None)
graphbox7Rect = graphbox7.get_rect()
graphbox7Rect.center = (boundarySpacing+((size[0]-2*boundarySpacing)*3/4),size[1]-boundarySpacing+10)
#Text Box for graph in y axis
graphbox4 = font1.render('250m',True,WHITE,None)
graphbox4Rect = graphbox4.get_rect()
graphbox4Rect.center = (boundarySpacing-5,((size[1]-boundarySpacing)/2))
graphbox5 = font1.render('500m',True,WHITE,None)
graphbox5Rect = graphbox5.get_rect()
graphbox5Rect.center = (boundarySpacing-5,boundarySpacing-10)
graphbox8 = font1.render('125m',True,WHITE,None)
graphbox8Rect = graphbox8.get_rect()
graphbox8Rect.center = (boundarySpacing-5,(size[1]-boundarySpacing)*3/4)
graphbox9 = font1.render('375m',True,WHITE,None)
graphbox9Rect = graphbox9.get_rect()
graphbox9Rect.center = (boundarySpacing-5,(size[1]-boundarySpacing)/4)
#Text box for scale
scale = font1.render('Length of room in meters',True,WHITE,None)
scaleRect = scale.get_rect()
scaleRect.center = (size[0]/2,boundarySpacing-10)



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
    surface.blit(menuSurface, (size[0]-menuSize[0], 0))

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
            resetButton.x = size[0]-menuSize[0]+10
            playButton.x = size[0]-menuSize[0]+10
            #Change Textbox
            graphbox1Rect.center = (boundarySpacing, size[1] - boundarySpacing + 10)
            graphbox2Rect.center = (boundarySpacing + ((size[0] - 2 * boundarySpacing) / 2), size[1] - boundarySpacing + 10)
            graphbox3Rect.center = ((boundarySpacing + (size[0] - 2 * boundarySpacing)), size[1] - boundarySpacing + 10)
            graphbox4Rect.center = (boundarySpacing -5, ((size[1] - boundarySpacing) / 2))
            graphbox5Rect.center = (boundarySpacing - 5, boundarySpacing-10)
            scaleRect.center = (size[0] / 2, boundarySpacing - 10)
            graphbox6Rect.center = (boundarySpacing + ((size[0] - 2 * boundarySpacing) / 4), size[1] - boundarySpacing + 10)
            graphbox7Rect.center = (boundarySpacing + ((size[0] - 2 * boundarySpacing) * 3 / 4), size[1] - boundarySpacing + 10)
            graphbox8Rect.center = (boundarySpacing - 5, (size[1] - boundarySpacing)* 3/4)
            graphbox9Rect.center = (boundarySpacing - 5, (size[1] - boundarySpacing) / 4)
        for box in input_boxes:
            box.handle_event(event)

        # User has clicked mouse button
        if event.type == pygame.MOUSEBUTTONUP:
            pos = pygame.mouse.get_pos()
            print(pos)
            if event.button == 1: #Left click
                # Check if user clicked on one of the buttons
                if resetButton.clicked(pos):
                    walls = []
                    addBoundaries()
                    for box in input_boxes:
                        box.update()

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

                elif not play:# Drawing a wall


                    if input_boxes[0].x <= pos[0] <= input_boxes[0].x + input_boxes[0].w and input_boxes[0].y <= pos[1] <= input_boxes[0].y + input_boxes[0].h:
                            continue
                    if input_boxes[1].x <= pos[0] <= input_boxes[1].x + input_boxes[1].w and input_boxes[1].y <= pos[1] <= input_boxes[1].y + input_boxes[1].h:
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
    distance = 0
    point = (0,0)
    # Calculate new rays
    if play:
        rays = []
        l = pygame.display.get_surface().get_width()
        if input_box.text!='':
            givenangle = int(input_box.text)
        if input_box2.text!='':
            l = int(input_box2.text)
            l = l*((size[0]-2*boundarySpacing)/500)
        for angle in range(0, 360, givenangle):
            # Create a new ray
            ray = Ray(pygame.mouse.get_pos(), angle,l)


            # Check every wall
            for wall in walls:
                x1, y1 = ray.start_pos
                x2, y2 = ray.end_point

                x3, y3 = wall.A
                x4, y4 = wall.B

                # Magical formula from wikipedia https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
                div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
                if div == 0:
                    # Parallel
                    continue

                t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / div
                u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / div

                # Check if there is an intersection point
                if 0.0 < t and u > 0.0 and u < 1:
                    point = (int(x1 + t * (x2 - x1)), int(y1 + t * (y2 - y1)))
                    distance = ((point[0] - ray.start_pos[0]) ** 2 + (point[1] - ray.start_pos[1]) ** 2) ** (1 / 2)
                    d1 = ((ray.end_point[0]-ray.start_pos[0])**2 + (ray.end_point[1]-ray.start_pos[1])**2) ** (1/2)
                    if d1 > distance:
                        ray.end_point = point

            rays.append(ray)


    # --- DRAWING ---
    surface.fill(BLACK)
    surface.blit(text1,textRect)
    surface.blit(text2,text2Rect)
    surface.blit(graphbox1,graphbox1Rect)
    surface.blit(graphbox2,graphbox2Rect)
    surface.blit(graphbox3,graphbox3Rect)
    surface.blit(graphbox4,graphbox4Rect)
    surface.blit(graphbox5,graphbox5Rect)
    surface.blit(graphbox6,graphbox6Rect)
    surface.blit(scale,scaleRect)
    surface.blit(graphbox7,graphbox7Rect)
    surface.blit(graphbox8,graphbox8Rect)
    surface.blit(graphbox9,graphbox9Rect)
    for box in input_boxes:
        box.draw(surface)
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

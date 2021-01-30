#!/usr/bin/env python3
import pygame
import math
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 50, 50)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 50)
SNOW = (255,250,250)
COLOR_INACTIVE = pygame.Color(GREEN)
COLOR_ACTIVE = pygame.Color(SNOW)
pygame.init()
font = pygame.font.SysFont("monospace", 15)
class Wall():
    def __init__(self, A, B):
        self.A = A
        self.B = B

class Ray():
    def __init__(self, start_pos, angle,length):
        self.start_pos = start_pos
        self.angle = angle
        self.length = length
        self.helper_pos = self.getHelperPoint(self.length)
        # Set same as helper if there is no walls and ray has to go out of the screen
        self.end_point = self.getHelperPoint(self.length)
    
    def getHelperPoint(self, length):
        # Is needed for calculating intersections
        # Get a point from starting pos, angle and lenght of vector

        return (length * math.cos(math.radians(self.angle)) + self.start_pos[0], length * math.sin(math.radians(self.angle)) + self.start_pos[1])


class Button():
    def __init__(self, x, y, width, height, text, color):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.text = text
        self.color = color
    
    @property
    def text(self):
        return self._text
    
    @text.setter
    def text(self, t):
        # Render new label
        self._text = t
        self.label = pygame.font.SysFont("monospace", 15).render(t, 1, (0, 0, 0))

    def values(self):
        return (self.x, self.y, self.width, self.height)

    def draw(self, surface):
        # Draw button
        pygame.draw.rect(surface, self.color, self.values())
        # Draw label
        surface.blit(self.label, (self.x + (self.width/2 - self.label.get_width()/2), self.y+(self.height/2 - self.label.get_height()/2)))
    
    def clicked(self, pos):
        if pos[0] > self.x and pos[0] < self.x + self.width:
            if pos[1] > self.y and pos[1] < self.y + self.height:
                return True

        return False
class InputBox():

    def __init__(self, x, y, w, h, text=''):
        self.rect = pygame.Rect(x, y, w, h)
        self.color = COLOR_INACTIVE
        self.text = text
        self.txt_surface = font.render(text, True, self.color)
        self.active = False
        self.x = x
        self.y = y
        self.w = w
        self.h = h
    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            # If the user clicked on the input_box rect.
            if self.rect.collidepoint(event.pos):
                # Toggle the active variable.
                self.active = not self.active
            else:
                self.active = False
            # Change the current color of the input box.
            self.color = COLOR_ACTIVE if self.active else COLOR_INACTIVE
        if event.type == pygame.KEYDOWN:
            if self.active:
                if event.key == pygame.K_RETURN or event.key == pygame.K_KP_ENTER:
                    try:
                        int(self.text)
                    except ValueError:
                        self.text = ''
                elif event.key == pygame.K_BACKSPACE:
                    self.text = self.text[:-1]
                else:
                    self.text += event.unicode
                # Re-render the text.
                self.txt_surface = font.render(self.text, True, self.color)

    def update(self):
        # Resize the box if the text is too long.
        self.text = ''
        self.txt_surface = font.render(self.text, True, self.color)
        #width = max(200, self.txt_surface.get_width()+10)
        #self.rect.w = width

    def draw(self, screen):
        # Blit the text.
        screen.blit(self.txt_surface, (self.rect.x+5, self.rect.y+5))
        # Blit the rect.
        pygame.draw.rect(screen, self.color, self.rect, 2)


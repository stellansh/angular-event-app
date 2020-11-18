import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { Event } from '../_models';

import { UserService, EventService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    events: Event[] = [];

   

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private eventService: EventService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllEvents();

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }
      deleteEvent(id: number) {
        this.eventService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllEvents()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
     private loadAllEvents() {
        this.eventService.getAll().pipe(first()).subscribe(events => {
            this.events = events;
        });
    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, EventService, AuthenticationService } from '../_services';

@Component({templateUrl: 'event.component.html'})
export class EventComponent implements OnInit {
    eventForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private eventService: EventService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        
    }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            eventName: ['', Validators.required],
            eventDescription: ['', Validators.required],
            date: ['', Validators.required],
            location: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.eventForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.eventForm.invalid) {
            return;
        }

        this.loading = true;
        this.eventService.createEvent(this.eventForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Event created', true);
                    this.router.navigate(['/event']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

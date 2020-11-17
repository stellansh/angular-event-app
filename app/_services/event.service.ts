import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../_models';

@Injectable({ providedIn: 'root' })
export class EventService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Event[]>(`/events`);
    }

    create(event: Event) {
        return this.http.post(`/events/event`, event);
    }

    delete(id: number) {
        return this.http.delete(`/events/${id}`);
    }
}
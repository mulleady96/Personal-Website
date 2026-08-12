import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { bootstrapCameraKit, CameraKit, Lens, CameraKitSession, createMediaStreamSource } from '@snap/camera-kit';
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzYxMzEyMjM0LCJzdWIiOiJhMTE1MzI3NS01M2VhLTRlOWQtYjkwZi00NzAzMzY5ZGM2MmN-U1RBR0lOR35jODZhYzVhZC05YjBjLTRlNDEtOWE1My1lYzVhZGUxOWNjY2MifQ.nvYzfHxvV1JDHXQHCRQ5ZnJ-xWpBpgMFhekkSth1Nac";
const LENS_GROUP_ID = "c3b9e897-b804-4522-b57d-66fb64242d91";
const snapLenses = ['29b63f02-cce2-42d3-9c01-127443776680', '6fbb0c75-29db-4642-ba52-c9a24cebdbdd', '6f148acd-47f2-40c2-8489-ce9e79f2dbd9', '50c27549-dcb6-4317-b893-c57ffa65bd06', 'c3d0885f-4b0e-4f68-a540-61fbfc894d01'];

@Component({
  selector: 'app-camera-kit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './camera-kit.component.html',
  styleUrls: ['./camera-kit.component.scss']
})
export class CameraKitComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cameraContainer', { static: false }) cameraContainer!: ElementRef<HTMLDivElement>;
  
  sdkStatus: 'loading' | 'ready' | 'error' = 'loading';
  lenses: Lens[] = [];
  selectedLensId: string = '';

  private cameraKit: CameraKit | null = null;
  private session: CameraKitSession | null = null;
  private mediaStream: MediaStream | null = null;

  constructor() {}

  async ngOnInit() {
    try {
      this.cameraKit = await bootstrapCameraKit({ apiToken: API_TOKEN });
      this.sdkStatus = 'ready';
      await this.loadLenses();
    } catch (error) {
      console.error('Failed to initialize Camera Kit:', error);
      this.sdkStatus = 'error';
    }
  }

  async ngAfterViewInit() {
    if (this.cameraKit && this.cameraContainer) {
      await this.initSession();
    } else {
      const checkInterval = setInterval(async () => {
        if (this.cameraKit && this.cameraContainer) {
          clearInterval(checkInterval);
          await this.initSession();
        }
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.session) {
      this.session.pause();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }

  private async loadLenses() {
    if (!this.cameraKit) return;
    
    this.lenses = [];
    for (const id of snapLenses) {
      try {
        const lens = await this.cameraKit.lensRepository.loadLens(id, LENS_GROUP_ID);
        this.lenses.push(lens);
      } catch (error) {
        console.warn(`Failed to load lens ${id}:`, error);
      }
    }

    if (this.lenses.length > 0) {
      this.selectedLensId = this.lenses[0].id;
      await this.applySelectedLens();
    } else {
      console.error('No lenses could be loaded. Ensure they are published to Production.');
    }
  }

  private async initSession() {
    if (!this.cameraKit || !this.cameraContainer) return;
    try {
      this.session = await this.cameraKit.createSession();
      
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const source = createMediaStreamSource(this.mediaStream, { cameraType: 'user' });
      await this.session.setSource(source);
      
      this.session.play();
      this.cameraContainer.nativeElement.appendChild(this.session.output.live);
      
      await this.applySelectedLens();
    } catch(err) {
      console.error('Error initializing session:', err);
    }
  }

  async onLensSelect() {
    await this.applySelectedLens();
  }

  private async applySelectedLens() {
    if (!this.session || !this.selectedLensId || !this.lenses.length) return;
    const lens = this.lenses.find(l => l.id === this.selectedLensId);
    if (lens) {
      try {
        await this.session.applyLens(lens);
      } catch (err) {
        console.error('Error applying lens:', err);
      }
    }
  }
}

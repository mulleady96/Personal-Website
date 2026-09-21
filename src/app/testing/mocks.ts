import { of } from 'rxjs';
import { vi } from 'vitest';
import { MediaItem } from '../Services/gravita.service';

export class MockGravitaService {
  AILimit = 10;
  
  getMediaFromFirestore = vi.fn().mockReturnValue(Promise.resolve([
    { title: 'Test Image', src: 'test.jpg', type: 'image', description: 'desc', date: '2024-01-01', likes: 10 } as MediaItem,
    { title: 'Test Video', src: 'test.mp4', type: 'video', description: 'desc', date: '2024-01-01', likes: 10 } as MediaItem
  ]));

  getArticles = vi.fn().mockReturnValue(Promise.resolve([]));
  createEnquiry = vi.fn();
  getLimit = vi.fn().mockReturnValue(Promise.resolve({ AILimit: 10 }));
  getBlogCache = vi.fn().mockReturnValue(Promise.resolve([]));
  createAIQuery = vi.fn().mockReturnValue(Promise.resolve());
  uploadMedia = vi.fn().mockReturnValue(Promise.resolve(true));
  getVideos = vi.fn().mockReturnValue(of([]));
}

export class MockMatDialog {
  open = vi.fn().mockReturnValue({
    afterClosed: () => of(true)
  });
}

export const mockActivatedRoute = {
  queryParams: of({}),
  params: of({})
};

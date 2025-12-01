import { Howl } from 'howler';

const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Short distinct click
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Soft blip
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Correct ping
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Soft buzz/error
  start: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3', // Whoosh
  tada: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Result fanfare
};

class SoundManager {
  private sounds: Record<string, Howl> = {};
  private enabled: boolean = true;

  constructor() {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      this.sounds[key] = new Howl({
        src: [src],
        volume: 0.5,
        preload: true,
      });
    });
  }

  play(key: keyof typeof SOUNDS) {
    if (this.enabled && this.sounds[key]) {
      this.sounds[key].play();
    }
  }

  toggle(enable: boolean) {
    this.enabled = enable;
  }
}

export const soundManager = new SoundManager();
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent {
  id: number;
  videos: any[] = [];
  Formations:any={}
  dir="D:/Nouveau dossier/Nouveau dossier/Nouveau dossier/projet_pfe1-1/src/main/webapp/Formations/"
  constructor(private videoService: HttpService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadVideos();
  }
v:any
mainVideoFileName: string = 'vid-1.mp4'; 
mainVideoTitle: string = 'house flood animation'; 
  loadVideos(): void {
    this.videoService.getById("formation", this.id).subscribe(data => {
      console.log(data);
      this.Formations=data
      this.Formations.lienVideo=this.convertPath(this.Formations.lienVideo)

    
      this.videos.forEach(element => {
        const lastIndex = element.filePath.lastIndexOf('/');

        element.filePath = element.filePath.substring(lastIndex + 1);
      });
      console.log(this.videos);
      this.v=this.videos[0]
      this.mainVideoFileName=this.v.filePath
      this.mainVideoTitle=this.v.nom
      this.setupVideoListEventListeners();
    });
  }

  setupVideoListEventListeners(): void {
    const videoList = document.querySelectorAll('.video-list-container .list');
    videoList.forEach(vid => {
      vid.addEventListener('click', () => {
        videoList.forEach(remove => remove.classList.remove('active'));
        vid.classList.add('active');
        const src = (vid.querySelector('.list-video') as HTMLVideoElement).src;
        const title = vid.querySelector('.list-title')?.innerHTML || '';
        const mainVideo = document.querySelector('.main-video-container .main-video') as HTMLVideoElement;
        const mainVidTitle = document.querySelector('.main-video-container .main-vid-title') as HTMLElement;
        mainVideo.src = src;
        mainVideo.play();
        mainVidTitle.innerHTML = title;
      });
    });
  }
  selectVideo(video: any): void {
    // Mettez à jour le nom de fichier et le titre de la vidéo principale avec la vidéo sélectionnée
    this.mainVideoFileName = video.filePath;
    this.mainVideoTitle = video.nom;
  }
  convertPath(path: string): string | null {
    if (path == null) {
        return null;
    }
    // Remplacer les doubles antislashs par des slashes
    let c = path.replace(/\\\\/g, '\\');
    // Remplacer les antislashs simples par des slashes
    let cc = c.replace(/\\/g, '/');
    return cc;
}



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-detail-cours',
  templateUrl: './detail-cours.component.html',
  styleUrls: ['./detail-cours.component.css']
})
export class DetailCoursComponent implements OnInit {
  id: number;
  videos: any[] = [];
  cours:any={}
  domain: string = "meet.jit.si"; // For self hosted use your domain

  dir="D:/Nouveau dossier/Nouveau dossier/Nouveau dossier/projet_pfe1-1/src/main/webapp/cours/"
  constructor(private videoService: HttpService, private route: ActivatedRoute,private router:Router) {
    this.id = this.route.snapshot.params['id'];
  }

 
v:any
mainVideoFileName: string = 'vid-1.mp4'; 
mainVideoTitle: string = 'house flood animation'; 
room: any;
options: any;
api: any;
user: any;
isAudioMuted = false;
isVideoMuted = false;
u:any
V1:any
ngOnInit(): void {
  this.loadVideos();
 

}
  loadVideos(): void {
    let c=localStorage.getItem("i")
  
 
    this.videoService.getById("Cours", this.id).subscribe(data => {
      console.log(data);
      
      if (data.categorie_cours.id===8) {
          this.videoService.getById("CourPresentiel", this.id).subscribe(data => {
        this.cours = data;
        console.log(data);
        
     
       
      });
      }
      if (data.lienmeet) {
        this.videoService.getById("CoursEnLigne", this.id).subscribe(data => {
      this.cours = data;
      console.log(data);
      let url=this.cours.lienmeet
      const match = url.match(/\/([^\/]+)$/);
      const lastPart = match ? match[1] : null;
      this.room = lastPart; // Set your room name
      console.log(lastPart);
      
      this.user = {
          name: this.u.username// Set your username
      }
   
     
    });
    }
    if (data.categorie_cours.id===10) {
      this.videoService.getById("CourAlaDemande", this.id).subscribe(data => {
    this.cours = data;
    console.log(data);
        console.log(this.convertPath(this.cours.lienvideo));
        this.V1=this.convertPath(this.cours.lienvideo)
        this.cours.lienvideo=this.convertPath(this.cours.lienvideo)
        console.log(this.V1);
        let x=this.V1.split("/")
        this.V1=x[x.length-1]
        
  });
  }
    
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


ngAfterViewInit(): void {
  this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
          // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
          displayName: this.u.username
      }
  }

  this.api = new JitsiMeetExternalAPI(this.domain, this.options);

   // Event handlers
  this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
  });
}
handleClose = () => {
console.log("handleClose");
}

handleParticipantLeft = async (participant:any) => {
console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
const data = await this.getParticipants();
}

handleParticipantJoined = async (participant:any) => {
console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant:any) => {
console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
console.log("handleVideoConferenceLeft");
this.router.navigate(['/thank-you']);
}

handleMuteStatus = (audio:any) => {
console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video:any) => {
console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
    }, 500)
});
}
executeCommand(command: string) {
this.api.executeCommand(command);;
if(command == 'hangup') {
  this.router.navigate(['/thank-you']);
  return;
}

if(command == 'toggleAudio') {
  this.isAudioMuted = !this.isAudioMuted;
}

if(command == 'toggleVideo') {
  this.isVideoMuted = !this.isVideoMuted;
}
}
}
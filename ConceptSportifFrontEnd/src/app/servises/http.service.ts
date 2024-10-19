import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {jwtDecode} from 'jwt-decode';
import { Video } from '../models/video';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    private apiUrl = 'https://dalidev.ddns.net:8082'; 
   //private apiUrl = 'http://dalidev.ddns.net:8082'; 
   private token = localStorage.getItem("token");
   private headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.token,
   }); 

  constructor(private http: HttpClient) {}

  getAll(model: string): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/api/${model}`, { headers: this.headers });
  }

  getById(model: string, id: number): Observable<any> {
    console.log(`${this.apiUrl}/${model}/${id}`);
    return this.http.get(`${this.apiUrl}/api/${model}/${id}`, { headers: this.headers });
  }

  create(model: string, data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/api/${model}`, data, { headers: this.headers });
  }

  update(model: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/${model}/${id}`, data, { headers: this.headers });
  }

  delete(model: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/${model}/${id}`, { headers: this.headers });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/registerCondidat`, data);
  }

  registeradmin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/addadmin`, data);
  }
  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/api/auth/signin`, data);
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgotPassword/verifyMail/`+email, { email });
  }

  resetPassword(data:any) {
    return this.http.post(`${this.apiUrl}/forgotPassword/changePassword/`+data.otp,{
      password:data.Password,
      repeatPassword:data.Password
    });
  }
  logedin():boolean{
    if (this.token) {
      return true
    } else {
      return false
    }
  }
  getRole(): string | null {
    try {
      const decodedToken: any = jwtDecode(this.token || '');
      console.log(decodedToken);
      
      return decodedToken.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  decodeToken(token: string): any {
    try {
        const decoded = jwtDecode(token);
        return decoded
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  }
  getimageiById(model: string, id: number): Observable<any> {
    console.log(`${this.apiUrl}/${model}/${id}`);
    return this.http.get(`${this.apiUrl}/api/${model}/${id}`, { headers: this.headers });
  }
  getBonEntreesBetweenDates(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>("https://dalidev.ddns.net:8082/api/bonentrees/betweenDates", { headers: this.headers, params: params });
  }
  getBonSortiesBetweenDates(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>("https://dalidev.ddns.net:8082/api/bonsorties/betweenDates", { headers: this.headers, params: params });
  }
  getoperationBetweenDates(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>("https://dalidev.ddns.net:8082/api/Operation/betweenDates", { headers: this.headers, params: params });
  }
  createtokens(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/api/auth/create-tokens`, data);
  }


  private headersaccestokenzoom = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('RpFojDftRBS2scPdZWn3w:2CeDhZQ3bOj58atMCwFhOQnE3hkAI94u') 
    }); 
  createaccestokenzoom(): Observable<any> {
    return this.http.post("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=kS3a7ZVDQvuTtqEnNmSL5g",
      {
        headers:this.headersaccestokenzoom
      }
    );

  }
 
  createmEETzoom(email:string,data: any,tokenzoom:string): Observable<any> {
    console.log(data);
    return this.http.post("https://api.zoom.us/v2/users/"+email+"/meetings", data,
      {
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenzoom,
        })
      }
    );
  }
  generateMeetLink(meetingName: string): Observable<string> {
    const url = `${this.apiUrl}/testinst/meetjitsi?meetingName=${meetingName}`;
    return this.http.get(url, { responseType: 'text' });
  }
  getAll2(model: string): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/${model}`,);
  }
  private headersVIDEO = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
  }); 
  uploadVideo(videoFormData: FormData,id:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/videos/upload/`+id, videoFormData, {
      headers:this.headersVIDEO
    });
  }
  uploadVideos(files: File[], courseId: number): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    const headers = new HttpHeaders();
    const req = new HttpRequest('POST', `${this.apiUrl}/api/videos/upload/${courseId}`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request<Video[]>(req)
  }
  uploadVideo2(videoFormData: FormData,id:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/videos/upload2/`+id, videoFormData, {
      headers:this.headersVIDEO
    });
  }
  uploadVideo3(videoFormData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/videos/uploadvideo`, videoFormData, {
      headers:this.headersVIDEO
    });
  }
  getById2(model: string, id1: number,id2:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/${model}/${id1}/${id2}`, { headers: this.headers });
  }
  
}

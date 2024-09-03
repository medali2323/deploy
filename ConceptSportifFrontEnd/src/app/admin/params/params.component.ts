import { Component } from '@angular/core';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent {
  tileDataView = [
    { title: "TVA", link: "/tva" },
    { title: "instructor", link: "/instructor" },
    { title: "represantant", link: "/represantant" },
    { title: "formation", link: "/formation" },
    { title: "cours", link: "/cours" },
    { title: "produit", link: "/produit" },
    { title: "user", link: "/user" },

    { title: "condidat", link: "/condidat" },
    { title: "abonnement", link: "/abonnement" },

    // Autres tuiles...
  ];

}

import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'Paramétrage',
        icon: 'fal fa-box-open',
        label: 'Paramétrage',
        items: [
            {
                routeLink: 'Paramétrage/Pays',
                label: 'Pays',
             
            },
            {
                routeLink: 'Paramétrage/liste_categorie_instructeur',
                label: 'Catégories des instructeurs',
            },
            {
                routeLink: 'Paramétrage/Pourcentage',
                label: 'Pourcentage',
             
            },
            {
                routeLink: 'Paramétrage/liste_categorie_representant',
                label: 'Catégories des représentants',
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fal fa-tags',
        label: 'Coupens',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fal fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];
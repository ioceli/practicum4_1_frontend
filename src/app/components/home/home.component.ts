import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { KeycloakService,  } from 'keycloak-angular';
import KeycloakAuthorization, * as KeycloakAuth from 'keycloak-js/dist/keycloak-authz';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // lista para el menu y submenus
  listaMenu: any[];

  userPermissions: any[] = []; // Store parsed permissions

  displayedColumns = ['id', 'name', 'progress', 'color', 'accion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public profile? : Keycloak.KeycloakProfile;
  public keyAuth : KeycloakAuth.AuthorizationRequest;

  private apiUrl = "";

  products: any[];
  cols: any[];
  name = 'Angular 5';
  options={
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
  };

  constructor(private _router: Router,  public keycloakService:KeycloakService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log("entra")
    /* KEYCLOAK VERIFICATION */
    if(this.keycloakService.isLoggedIn()){
      console.log("Registrado")
      this.keycloakService.loadUserProfile().then((profile: Keycloak.KeycloakProfile)=>{
      this.profile=profile;
      this.userPermissions = this.keycloakService.getUserRoles();
      console.log(this.userPermissions)
      //this.processMenuPermissions(); // Parse and generate filtered menu
      });
    }else{
      this.login()
    }
    /* END KEYCLOAK VERIFICATION */
    /* This is the code that is responsible for the animation of the menu. */
    let sideBar = document.querySelector(".sidebar");
    let sideBarBtn = document.querySelector(".bx-menu");
    let menu_header = document.querySelector(".menu_header");

    // mostrar ocultar menu para anchos mayores 780px
    sideBarBtn.addEventListener("click", () => {
      sideBar.classList.toggle("close");
      menu_header.classList.toggle("menu_header_move");
    });

    // para anchos menores a 760px recarga la pagina
    // se oculata el menu automaticamente
    if (window.innerWidth < 780) {
      sideBar.classList.add("close");
    }

    // para tamaños resileables
    window.addEventListener("resize", function () {
      if (window.innerWidth > 780) {
        console.log("mayor de 780px");
        sideBar.classList.remove("close");
        menu_header.classList.toggle("menu_header_move");
      }
      if (window.innerWidth < 780) {
        console.log("adapta");
        sideBar.classList.add("close");
        menu_header.classList.toggle("menu_header_move");
      }
    });
    let resources = this.keycloakService.getKeycloakInstance().resourceAccess;// Loop through the properties of resourceAccess
    for (let client in resources) {
        if (resources.hasOwnProperty(client)) {
            console.log(`Client: ${client}`);

            // Log roles associated with the client
            let roles = resources[client].roles;
            console.log("Roles:", roles);
        }
    }

    const authorization = new KeycloakAuthorization(this.keycloakService.getKeycloakInstance());

    //GETTING RESOURCES OF THE CLIENT
    //})

    this.keycloakService.getToken().then((key)=>{

        this.fetchData(key).subscribe((result) => {
          console.log(result)
        });

    });
    this.listaMenu = [
      // { nombre: 'Tasas', ruta: '/home/tipologias', icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKJJREFUSEu9ldENgzAQQ+0JOkLLJh2FTkZH6SiwARsY5SNIHM3HBZn8RcndOztSTJgXzf1xL0DSG8AE4NWpbAbwIfmr9QcFksqFZ2fzWjaTHFoAlQOSXdZJOtVHBfcC4kR1Hy2sitMK7IDsY6cV2AF2i+wAu0V2gN0iO8BukQOwAnhkG4f7C8k9T+JvWgLneyETFgBjM3AuTv63vCtYMoPYARsr6LYZ8bpKdAAAAABJRU5ErkJggg==", submenu: true, listaMenus: [{ menu: 'Tipologías', ruta: '/home/tasas/tipologias' }, { menu: 'Recetas Especiales', ruta: '/home/tasas/tipologias' }, { menu: 'Certificado No Sanción', ruta: '/home/tasas/tipologias' }, { menu: 'Habilitación Profesional', ruta: '/home/tasas/tipologias' }, { menu: 'Terapias Alternativas', ruta: '/home/tasas/tipologias' }, { menu: 'ESAMYN', ruta: '/home/tasas/tipologias' }, { menu: 'Condiciones', ruta: '/home/tasas/tipologias' }] },
      // { nombre: 'Tasas', ruta: '/home/seccion', icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKJJREFUSEu9ldENgzAQQ+0JOkLLJh2FTkZH6SiwARsY5SNIHM3HBZn8RcndOztSTJgXzf1xL0DSG8AE4NWpbAbwIfmr9QcFksqFZ2fzWjaTHFoAlQOSXdZJOtVHBfcC4kR1Hy2sitMK7IDsY6cV2AF2i+wAu0V2gN0iO8BukQOwAnhkG4f7C8k9T+JvWgLneyETFgBjM3AuTv63vCtYMoPYARsr6LYZ8bpKdAAAAABJRU5ErkJggg==", submenu: true, listaMenus: [{ menu: 'sub menu 1', ruta: '/home/seccion' }, { menu: 'sub menu 2', ruta: '/home/seccion' }, { menu: 'sub menu 3', ruta: '/home/seccion' }] },
      // { nombre: 'otros', ruta: '/home/seccion', icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJhJREFUSEu9ldENgCAMRB8TOIK6iaPoZDqKo+gGbqAhkcSUaAQ8+SPQe+2RcA7xcmJ9fgd0wAg0mZMtwADMod5O4C/UmeKhzGu0d4D9PMi1Lqq3Qr8DLDDsrYuh0eQJ5IDU906eQA6QWyQHyC2SA+QWyQFyiz4HbECVqmrur9c8sb+pD5ypIBO8eP8UOIXNx+W5wfK6ETngAPa1Mhk/XZynAAAAAElFTkSuQmCC", submenu: false },
      // { nombre: 'tipologias', ruta: '/home/tipologias', icono: '../../../assets/iconsMenu/tipologias.svg', submenu: false }
      { nombre: 'Habilitacion', ruta: '/home/direcionhabilitacion', icono: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKJJREFUSEu9ldENgzAQQ+0JOkLLJh2FTkZH6SiwARsY5SNIHM3HBZn8RcndOztSTJgXzf1xL0DSG8AE4NWpbAbwIfmr9QcFksqFZ2fzWjaTHFoAlQOSXdZJOtVHBfcC4kR1Hy2sitMK7IDsY6cV2AF2i+wAu0V2gN0iO8BukQOwAnhkG4f7C8k9T+JvWgLneyETFgBjM3AuTv63vCtYMoPYARsr6LYZ8bpKdAAAAABJRU5ErkJggg==", submenu: true, listaMenus: [{ menu: 'Solicitud', ruta: '/home/direcionhabilitacion/solicitud' }, { menu: 'Seguimiento', ruta: '/home/direcionhabilitacion/seguimiento' }] }
    ];
  }

  async login() {
      await this.keycloakService.login({
          //redirectUri: window.location.origin
          redirectUri: window.location.origin+'/home'
      });
  }
  openNew() {

  }
  fetchData(token): Observable<Data[]> {
  const headers= new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .append('Accept', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Credentials','true')

    return this.http.get<Data[]>(`http://192.168.66.16:8080/realms/SACSS/authz/protection/resource_set?uri=${encodeURIComponent('')}&matchingUri=${true}&deep=${true}`,{ headers, withCredentials: true });
  }
  ngOnDestroy(): void {
    // para destruir las conexiones
  }

  /**
   * The function takes an event as an argument, then finds the parent element of the parent element of
   * the target of the event, and toggles the class "showMenu" on that element
   * @param {any} event - any - this is the event that is triggered when the user clicks on the menu
   * item.
   */
  subMenu(event: any) {
    let sub = event.target.parentElement.parentElement;
    sub.classList.toggle("showMenu");
  }

  /**
   * Cada vez que se recarga la pagina se colocara en la parte superior de la misma
   */
  scrollUp() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  logout() {
    this.keycloakService.logout(window.location.origin)
  };
}

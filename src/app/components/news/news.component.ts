import { Component, OnInit } from '@angular/core';
import { news } from 'src/app/models/news';
import { coments } from 'src/app/models/coments';
import { NewsService } from 'src/app/services/News/news.service';
import { ComentService } from 'src/app/services/Coments/coment.service';
import { CorreoService } from 'src/app/services/Mail/correo.service';
import { correo } from 'src/app/models/correo';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: news[];
  coments : news[];
  correo = new correo();


  currentNews = null;
  msgError = '';
  closeModal: string;
  submitted = false;

  //test mi loco


  constructor(private newsService: NewsService, private modalService: NgbModal, private correoService: CorreoService, private comentService: ComentService) { }

  ngOnInit(): void {
    this.newsService.getCustomers().subscribe((data: news[]) => {
      console.log(this.news = data)
      this.news = data;

    });

}






  postcorreo(): void {
    const data = {

      mailFrom: this.correo.mailFrom,
      mailTo: this.correo.mailTo,
      mailSubject: this.correo.mailSubject,
      mailContent: this.correo.mailContent
    };
    //console.log(data);

    this.correoService.EnviarCorreo(data)
      .subscribe(
        response => {
          this.submitted = true;
          console.log(response);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }






  triggerModal(content: any, val: news) {
    console.log("Val --> ", val);

    this.currentNews = val
    console.log("This --> ", this.currentNews.id);
    this.retrieveBook(this.currentNews.id)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getComentsById(val: String): void {
    this.comentService.getComentsById(val).
      subscribe(
        data => {
          this.currentNews = data;
          console.log("ESta es el find --- >",data);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }


  retrieveBook(val: string): void {
    this.newsService.get(val)
      .subscribe(
        data => {
          this.currentNews = data;
          console.log(data);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }

  deleteNewsById(val1: string): void {
    this.newsService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateBook(): void {
    this.newsService.update(this.currentNews.id, this.currentNews)
      .subscribe(
        data => {
          console.log("Esta es la data del update ", data);
          this.refreshList();

        },
        error => {
          console.log(error);
        });
  }



  refreshList(): void {
    this.ngOnInit();
  }
}

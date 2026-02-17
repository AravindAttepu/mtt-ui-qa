import {Injectable} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SEOService {
  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    if (title == null) {
        title = "Sadisha Foundation";
    }
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    if (desc == null) {
        desc = "Sadisha means Right Direction. We are a registered NGO and a passionate team of more than 150 people who want to address countless problems in rural India.";
    }
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateKeyword(keywords: string) {
    if (keywords == null) {
        keywords = "Sadisha,Right Direction, NGO, Math Talent Test";
    }
    this.meta.updateTag({ name: 'keywords', content: keywords })
  }
}
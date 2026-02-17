import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PapersRoutingModule } from "./papers-routing.module";
import { PapersListComponent } from "./papers-list/papers-list.component";
import { PapersComponent } from "./papers/papers.component";

@NgModule({
  declarations: [PapersListComponent, PapersComponent],
  imports: [CommonModule, PapersRoutingModule, FormsModule],
})
export class PapersModule {}

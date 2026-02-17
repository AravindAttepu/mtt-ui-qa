import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PapersListComponent } from "./papers-list/papers-list.component";
import { PapersComponent } from "./papers/papers.component";

const routes: Routes = [
  {
    path: "",
    component: PapersComponent,
    children: [
      { path: "paper-list", component: PapersListComponent },
      { path: "**", redirectTo: "paper-list", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PapersRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagePuzzleComponent } from './image-puzzle/image-puzzle.component';
import { WinnerdetailComponent } from './winnerdetail/winnerdetail.component';
const routes: Routes = [
  { path: '', component: ImagePuzzleComponent },
  { path: 'winnerinfo', component: WinnerdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

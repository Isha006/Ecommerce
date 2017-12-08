import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TransitionPage } from '../transition/transition';
import { AddPage } from '../add/add';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TransitionPage;
  tab3Root = AddPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}

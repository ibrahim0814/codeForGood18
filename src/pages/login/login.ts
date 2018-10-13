import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {Validators, FormBuilder, FormGroup } from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
// eslint-disable-line
import {ERGsPage} from "../ERGs/ERGs";
import { HomePage } from "../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: FormGroup

  constructor(public nav: NavController, public forgotCtrl: AlertController, private formBuilder: FormBuilder, public menu: MenuController, public toastCtrl: ToastController, public authProvider: AuthProvider) {
    this.menu.swipeEnable(false);
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    const {email, password} = this.loginForm.value;
    this.authProvider.loginUser(email, password);
    this.nav.setRoot(HomePage);
  }



  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter your email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

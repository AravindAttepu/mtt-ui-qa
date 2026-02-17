import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { HttpResponse } from "@angular/common/http";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAPILoading = false;
  loginError = "";
  fieldErrors = {
    userName: "",
    password: ""
  };

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    localStorage.clear();
    this.apiService.setToken("");
  }

  ngOnInit() {
    this.initForm();

    // Clear errors when user starts typing
    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = "";
      this.fieldErrors = { userName: "", password: "" };
    });
  }
  login() {
    try {
      // Reset errors
      this.loginError = "";
      this.fieldErrors = { userName: "", password: "" };

      // Validate form fields
      if (!this.loginForm.value.userName || this.loginForm.value.userName.trim() === "") {
        this.fieldErrors.userName = "Please enter your username";
        return;
      }

      if (!this.loginForm.value.password || this.loginForm.value.password.trim() === "") {
        this.fieldErrors.password = "Please enter your password";
        return;
      }

      // Mark form as submitted and validate
      if (this.loginForm.invalid) {
        this.loginError = "Please fill in all required fields";
        return;
      }

      localStorage.clear();
      this.isAPILoading = true;
      this.apiService.showLoader.next(true);
      this.apiService.login(this.loginForm.value).subscribe(
        (response: HttpResponse<any>) => {
          this.apiService.showLoader.next(false);
          this.isAPILoading = false;
          if (response.status && response.status === 200) {
            const body = JSON.parse(response.body) || {};
            const role =
              body.roles && body.roles.assignedRoles ? body.roles.assignedRoles : '';
            const allRoles =
              body.roles && body.roles.allRoles && typeof body.roles.allRoles === 'string' ? JSON.parse(body.roles.allRoles || '[]') : [];
            localStorage.setItem("allRoles", JSON.stringify(allRoles));
            this.apiService.setAllRole(allRoles);
            localStorage.setItem("adminUser", response.body);
            localStorage.setItem("userName", body.roles.userName);
            const token = response.headers.get("auth_token");
            localStorage.setItem("auth_token", token);
            localStorage.setItem("role", role);
            this.apiService.setUserDetails(body);
            this.apiService.setToken(token);
            this.apiService.setRole(role);

            if (role.indexOf("STUDENT") > -1) {
              this.router.navigate(["./student"]);
            } else {
              this.router.navigate(["/admin"]);
            }
          }
          if (response && typeof response === "string") {
            const resp = JSON.parse(response);
            if (resp && resp.message) {
              this.apiService.genericMessage(resp.message, "success");
              this.login();
            }
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          this.isAPILoading = false;

          // Handle specific error cases
          if (error.status === 401 || error.status === 403) {
            this.loginError = "Invalid username or password. Please try again.";
            this.fieldErrors.userName = "Check your username";
            this.fieldErrors.password = "Check your password";
          } else if (error.error && error.error.message) {
            this.loginError = error.error.message;
            // Also show toast for backward compatibility
            this.apiService.genericMessage(
              error.error.message || "Something went wrong",
              "error"
            );
          } else {
            this.loginError = "Unable to login. Please check your credentials and try again.";
          }

          console.log(error);
        }
      );
    } catch (e) {
      this.isAPILoading = false;
      this.loginError = "An unexpected error occurred. Please try again.";
      console.warn(e);
    }
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}

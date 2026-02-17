import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CONSTANTS } from "./api.constant";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
export type CommonAlert = {
  type: "dru-alert";
  value: {
    alertType: "info" | "warning" | "error" | "success";
    // any valid html code. except for custom component can be passed with classes as well
    htmlContent: string;
    // default v-bottom
    position: "v-center" | "v-bottom";
    // duration in ms
    duration?: number;
  };
};

@Injectable()
export class ApiService {
  baseUrl = "";
  rolesList: Array<any> = [];
  dummyStudents = [
    {
      Name: "GOVARDHAN POLIMERA",
      parentName: "SRINIVAS",
      school: "ZPHS REDDYPALEM, GUNTUR",
      rankinOpenCategory: 1,
    },
    {
      Name: "SANDEEP GODUGU",
      parentName: "KRISHNAMURTHY",
      school: "TSMS THIRUMALGIRI, SURYAPET",
      rankinOpenCategory: 2,
    },
    {
      Name: "SK SHAHIN",
      parentName: "ALLAUDDIN",
      school: "ZPHS SIRIPURAM, SURYAPET",
      rankinOpenCategory: 4,
    },
    {
      Name: "SATWIKA VARALA",
      parentName: "MALLESHAM",
      school: "TSMS ELGANDHAL, KARIMNAGAR",
      rankinOpenCategory: 5,
    },
    {
      Name: "SAI SRI KALVA",
      parentName: "BALARAJU",
      school: "ZPHS GIRLS SIRICILLA, KARIMNAGAR",
      rankinOpenCategory: 7,
    },
    {
      Name: "SAI KRISHNA P",
      parentName: "RAJU",
      school: "ZPHS NIMMAPALLI, KARIMNAGAR",
      rankinOpenCategory: 8,
    },
    {
      Name: "SAI RAJ NUNE",
      parentName: "POORNACHANDAR",
      school: "ZPHS MALLAMPALLI, WARANGAL",
      rankinOpenCategory: 8,
    },
    {
      Name: "RAKSHITH S",
      parentName: "RAMASWAMY",
      school: "TSMS ELGANDHAL, KARIMNAGAR",
      rankinOpenCategory: 10,
    },
    {
      Name: "TRINESH T",
      parentName: "RAJENDAR",
      school: "TSMS ELGANDHAL, KARIMNAGAR",
      rankinOpenCategory: 11,
    },
    {
      Name: "HARSHA PALOJU",
      parentName: "SRINIVAS",
      school: "TSMS ELGANDHAL, KARIMNAGAR",
      rankinOpenCategory: 12,
    },
    {
      Name: "BAJARANG VILAS SHAHAPURE",
      parentName: "VILAS SHAHAPURE",
      school: "ZPHS KUNTUR, NANDED",
      rankinOpenCategory: 12,
    },
    {
      Name: "SRIVIDYA PONNAM",
      parentName: "THIRUPATHI",
      school: "ZPHS KOTHAPALLI, KARIMNAGAR",
      rankinOpenCategory: 14,
    },
    {
      Name: "NUSRATH SHAIK",
      parentName: "SAIDULU",
      school: "ZPHS SIRIKONDA, SURYAPET",
      rankinOpenCategory: 15,
    },
    {
      Name: "HAREESH THUNIKIPATI",
      parentName: "SOMAIAH",
      school: "TSMS TIRUMALGIRI",
      rankinOpenCategory: 15,
    },
    {
      Name: "YAKSHENDRA KUMAR",
      parentName: "KSHEERA SAGAR",
      school: "GOVT HIGH SCHOOL, SURYAPET",
      rankinOpenCategory: 17,
    },
    {
      Name: "LAVANYA GOUDA",
      parentName: "MAHESH",
      school: "ZPHS KOTHAPALLY, KARIMNAGAR",
      rankinOpenCategory: 18,
    },
    {
      Name: "AKSHAYA B",
      parentName: "SANJEEV",
      school: "ZPHS SAVARAN, KARIMNAGAR",
      rankinOpenCategory: 19,
    },
    {
      Name: "Swarnapriya Konjarla",
      parentName: "Srinivas",
      school: "ZPHS GIRLS JULAPALLI, KNR",
      rankinOpenCategory: 20,
    },
    {
      Name: "HARICHANDANA T",
      parentName: "SWARNALATHA",
      school: "TSMS CHIGURUMAMIDI",
      rankinOpenCategory: 21,
    },
    {
      Name: "AJAY DARLA",
      parentName: "DANAIAH",
      school: "ZPHS MELACHERUVU, SURYAPET",
      rankinOpenCategory: 23,
    },
    {
      Name: "SHASHIDHAR BURGULA",
      parentName: "NAGASURENDAR",
      school: "SRRMGH BANIGANDLAPADU",
      rankinOpenCategory: 24,
    },
    {
      Name: "VENKATESH B",
      parentName: "SRINU",
      school: "ZPHS GHS MADHIRA, KHAMMAM",
      rankinOpenCategory: 25,
    },
    {
      Name: "RISHIT CH",
      parentName: "JYOTHI",
      school: "GHS RECO BAZAR",
      rankinOpenCategory: 26,
    },
    {
      Name: "AJAY R",
      parentName: "RAMESH R",
      school: "GHS OLD JAGITIAL",
      rankinOpenCategory: 26,
    },
    {
      Name: "SPOORTHI EPPANAPALLY",
      parentName: "SHANKAR",
      school: "ZPHS GIRLS JULAPALLI, KNR",
      rankinOpenCategory: 26,
    },
    {
      Name: "AKSHITHA POLAGANI",
      parentName: "RAJU",
      school: "ZPHS GIRLS JULAPALLI, KNR",
      rankinOpenCategory: 26,
    },
    {
      Name: "HARSHA B",
      parentName: "GABBAR B",
      school: "GHS RECO BAZAR",
      rankinOpenCategory: 26,
    },
    {
      Name: "RAMCHARAN P",
      parentName: "RAJU",
      school: "ZPHS SHANIGARAM",
      rankinOpenCategory: 26,
    },
    {
      Name: "HARINI LINGALA",
      parentName: "SARITHA",
      school: "ZPHS JANGAPALLY, KNR",
      rankinOpenCategory: 32,
    },
    {
      Name: "SATYA TANNEERU",
      parentName: "SRINVAS",
      school: "TSMS IMAMPET",
      rankinOpenCategory: 33,
    },
    {
      Name: "MAHESHWAR",
      parentName: "SEETHARAM",
      school: "SRRMGH BANIGANDLAPADU",
      rankinOpenCategory: 32,
    },
    {
      Name: "VARUN MARAM",
      parentName: "PITCHI",
      school: "TSMS MATTAMPALLY",
      rankinOpenCategory: 34,
    },
    {
      Name: "ASHIWITHA A",
      parentName: "RAGHUPATHI",
      school: "TSMS ELGANDAL",
      rankinOpenCategory: 34,
    },
    {
      Name: "MANISHWAR MYANA",
      parentName: "SATHYANARAYANA",
      school: "ZPHS NIMMAPALLI",
      rankinOpenCategory: 37,
    },
    {
      Name: "SRIVALLI GALIPALLY",
      parentName: "MAHESH",
      school: "TSMS ELGANDAL",
      rankinOpenCategory: 37,
    },
    {
      Name: "SREENITH LEKKALA",
      parentName: "VANI LAXMAN",
      school: "ZPHS MALLAMPALLY, WGL",
      rankinOpenCategory: 39,
    },
    {
      Name: "KARUNAKAR S",
      parentName: "ASHOK S",
      school: "GHS DHANGARWADI",
      rankinOpenCategory: 39,
    },
    {
      Name: "BALA VENKATA SAI N",
      parentName: "RAMESH",
      school: "ZPHS LINGANNAPET",
      rankinOpenCategory: 39,
    },
    {
      Name: "SIDHARTHA RAMADUGU",
      parentName: "MALLIAH",
      school: "TSMS RUKMAPUR",
      rankinOpenCategory: 39,
    },
    {
      Name: "PRAVALLIKA VEERABATHINI",
      parentName: "MAHESH",
      school: "ZPHS GIRLS SIRICILLA",
      rankinOpenCategory: 43,
    },
    {
      Name: "MANITHEJA KOTTINTI",
      parentName: "GANGADHAR",
      school: "ZPHS YELLAREDDYPET",
      rankinOpenCategory: 43,
    },
    {
      Name: "SAI SRINIJA",
      parentName: "KISHTASWAMY",
      school: "ZPHS JANGAPALLY, KNR",
      rankinOpenCategory: 45,
    },
    {
      Name: "PRITHVI GUGULOTHU",
      parentName: "KALRAM",
      school: "ZPHS SURYAPET",
      rankinOpenCategory: 46,
    },
    {
      Name: "VANITHA VARA",
      parentName: "SURIBABU",
      school: "ZPSS GOVINDAPURAM",
      rankinOpenCategory: 47,
    },
    {
      Name: "ASHOK BATHINI",
      parentName: "GANGARAJU",
      school: "ZPHS KOTHAPALLY",
      rankinOpenCategory: 48,
    },
    {
      Name: "SHIVAKUMAR SAINI",
      parentName: "RAVINDAR",
      school: "TSMS ELGANDAL",
      rankinOpenCategory: 48,
    },
    {
      Name: "JAYANDEEP g",
      parentName: "GOPINATH",
      school: "ZPSS PANDURANGAPURAM, KHAMMAM",
      rankinOpenCategory: 51,
    },
    {
      Name: "PUJITA VIKKURTI",
      parentName: "SATTAYYA",
      school: "ZPHS NIMMAPALLI",
      rankinOpenCategory: 53,
    },
    {
      Name: "VAISHNAVI KATTAM",
      parentName: "HANUMANTHA REDDY",
      school: "TSMS CHIGURUMAMIDI",
      rankinOpenCategory: 53,
    },
    {
      Name: "GOPINADH TELUKUNDI",
      parentName: "PERAIAH",
      school: "ZPHS CHILUKURU",
      rankinOpenCategory: 55,
    },
    {
      Name: "AKSHITH MUNIGALA",
      parentName: "KONDAYYA",
      school: "TSMS ELGANDAL",
      rankinOpenCategory: 55,
    },
    {
      Name: "AKSHAYA EERLA",
      parentName: "SHANKARAYYA EERLA",
      school: "ZPHS RAGAMPET",
      rankinOpenCategory: 55,
    },
    {
      Name: "ZAKIR SK",
      parentName: "MAHBOOB SUBHANI",
      school: "ZPSS GANDHASIRI, KMM",
      rankinOpenCategory: 58,
    },
    {
      Name: "NARENDAR MADDULA",
      parentName: "SATYANARAYANA",
      school: "TSMS MATTAMPALLI, SURYAPET",
      rankinOpenCategory: 58,
    },
    {
      Name: "SAIDEEP T",
      parentName: "VENKATALAXMI",
      school: "ZPSS PANDURANGAPURAM, KMM",
      rankinOpenCategory: 60,
    },
    {
      Name: "BHANU G",
      parentName: "SADAIAH",
      school: "ZPHS MALLAMPALLI, WGL",
      rankinOpenCategory: 61,
    },
    {
      Name: "MANOJ KADEM",
      parentName: "ASHOK",
      school: "ZPHS GIRLS SIRICILLA",
      rankinOpenCategory: 63,
    },
    {
      Name: "BHAURAO NARAYAN PUYAD",
      parentName: "NARAYAN",
      school: "ZPHS VISHNUPURI, NANDED",
      rankinOpenCategory: 63,
    },
    {
      Name: "GUDE YAMINI",
      parentName: "RAMESH",
      school: "ZPHS KANDUKURU",
      rankinOpenCategory: 65,
    },
    {
      Name: "SRINIVAS BANDARI",
      parentName: "SAMPATH",
      school: "TSMS CHIGURUMAMIDI",
      rankinOpenCategory: 65,
    },
    {
      Name: "HEMANTH V",
      parentName: "SHANKAR",
      school: "ZPSS PANDURANGAPURAM, KMM",
      rankinOpenCategory: 67,
    },
    {
      Name: "KRISHNANJALI ELUGUM",
      parentName: "KOMALA",
      school: "TSMS ELGANDHAL",
      rankinOpenCategory: 68,
    }
  ];
  managerDeptId: string | number = "";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  internalNotifier = new Subject<{ type: any; value: any } | CommonAlert>();
  showLoader = new Subject();
  sideNavOpened = new Subject();
  token = "";
  role = "";
  allRoles: Array<string> = [];
  userDetails = {};
  loggedInUserId: string | number = "";
  nextAttemptNumber = null;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.baseUrl = CONSTANTS.BASE_URL;
    const attemptNumber: any = this.cookieService.get("attemptNumber") || 0;
    this.cookieService.set("attemptNumber", String(Number(attemptNumber) + 1));
    this.token = localStorage.getItem("auth_token");
    this.role = localStorage.getItem("role");
    this.userDetails = JSON.parse(localStorage.getItem("adminUser") || "{}");
    this.allRoles = JSON.parse(localStorage.getItem("allRoles") || "[]");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
  }

  setToken(token: string) {
    this.token = token;
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
  }
  setRole(role: string) {
    this.role = role;
  }
  getRole() {
    return this.role;
  }
  setAllRole(allRoles: Array<string>) {
    this.allRoles = allRoles;
  }
  getAllRoles() {
    return this.allRoles;
  }
  setUserDetails(userDetails = {}) {
    this.userDetails = userDetails;
  }

  getUserDetails() {
    return this.userDetails;
  }

  getUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    const uuid = s.join("");
    return uuid;
  }

  login(payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.LOGIN}`;
    return this.httpClient.post(apiUrl, payload, {
      ...this.httpOptions,
      ...{ responseType: "text", observe: "response" },
    });
  }

  forgotPsw(phone): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.FORGOT_PSW}?phoneNumber=${phone}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.httpClient.get(apiUrl, httpOptions);
  }

  fetchQuestionPapers(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.FETCH_QUESTIONS}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  getAnswerPaper(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPER}`;
    return this.httpClient.get(apiUrl, {
      ...httpOptions,
      ...{ responseType: "text", observe: "response" },
    });
  }
  getAllAnswerPaper(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPER}s`;
    return this.httpClient.get(apiUrl, {
      ...httpOptions,
      ...{ responseType: "text", observe: "response" },
    });
  }
  submitAnswerPaper(payload: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPER}`;
    return this.httpClient.post(apiUrl, payload, {
      ...httpOptions,
      ...{ responseType: "text", observe: "response" },
    });
  }

  fetchQuestionsForPractice(contestId): Observable<any> {
    const prevAttemptNumber: any = this.cookieService.get("attemptNumber") || 0;
    this.nextAttemptNumber = String(Number(prevAttemptNumber) + 1);
    this.cookieService.set("attemptNumber", this.nextAttemptNumber);
    const studentId = this.cookieService.get("studentId");
    const apiUrl = `${this.baseUrl}/${CONSTANTS.QUESTIONS}/${studentId}/${contestId}/${this.nextAttemptNumber}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

getStatusCounts(): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth_token': this.token
  });

  const httpOptions = {
    headers: headers
  };

  const apiUrl = `${this.baseUrl}/paperscount`;
  console.log("calling  counts");

  return this.httpClient.get(apiUrl, httpOptions);
}

  fetchPapersBasedOnStatus(status: string,  offset?: number, limit?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    if (offset !== undefined && limit !== undefined)
    {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPERS_BY_STATUS}${status}&offset=${offset}&limit=${limit}`;
     return this.httpClient.get(apiUrl, httpOptions);
    }
  else
  {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWERS_PAPERS_PENDING}${status}`;
     return this.httpClient.get(apiUrl, httpOptions);
    }
 }

  fetchPapersBasedOnUser(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPERS_BY_STATUS_BY_USER}${user}`;

    return this.httpClient.get(apiUrl, httpOptions);
  }
  deletePapers(url, status): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWER_PAPER}?imageUrl=${url}&pendingStatus=${status}`;

    return this.httpClient.delete(apiUrl, httpOptions);
  }
  submitAnswers(payload, contestId): Observable<any> {
    const studentId = this.cookieService.get("studentId");
    const apiUrl = `${this.baseUrl}/${CONSTANTS.SUBMIT}/${studentId}/${contestId}/${this.nextAttemptNumber}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  // Student registration
  getListOfSchools(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.SCHOOLS}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  getListOfExamCenters(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.EXAM_CENTERS}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  getRandomStudent(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GET_STUDENT}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }
  getAllStudents(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(
      `${this.baseUrl}/${CONSTANTS.STUDENTS}`,
      httpOptions
    );
  }

  getStudentsStats(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(
      `${this.baseUrl}/${CONSTANTS.STUDENTS_STATS}`,
      httpOptions
    );
  }

  getAllUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(
      `${this.baseUrl}/${CONSTANTS.USERS}`,
      httpOptions
    );
  }

  getFinalResults(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(
      `${this.baseUrl}/${CONSTANTS.RESULTS_SYNC}`,
      httpOptions
    )
  }
  getGateResults():Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.get(
      `${this.baseUrl}/${CONSTANTS.RESULTS_GATE}`,
      httpOptions
    )
  }

  updateUserRoles(userId: string, payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.USERS}?userName=${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.put(apiUrl, payload, httpOptions);
  }

  getStudentDetails(studentId: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GET_STUDENT}/${studentId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }



  computeStats(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.COMPUTE_STATS}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  deleteStudent(userName: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GET_STUDENT}/?userName=${userName}`;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.delete(apiUrl, httpOptions);
  }
  clearStudentAns(userName: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ANSWERS_BY_USER}${userName}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.post(apiUrl, userName, httpOptions);
  }
  studentRegistration(payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.STUDENTS}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }
  // Gallery
  addStudentImage(payload, id): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.UPLOAD_PHOTO}/${id}`;
    // const apiUrl = `${this.baseUrl}/${CONSTANTS.GALLERY}/photos`;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/x-www-form-urlencoded",
        auth_token: '6f500f26-e515-4a8f-9add-f2ae852'
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  addPaperImage(payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.UPLOAD_PAPER}`;
    const httpOptions = {
      headers: new HttpHeaders({
      // "Content-Type": "multipart/form-data",
        auth_token: this.token,
      }),
    };
    console.log(apiUrl);
    console.log(httpOptions);
    console.log(this.token);

    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  registerStudentWithPhoto(studentPayload: any, photoFile: File) {
 const formData = new FormData();
  formData.append("jsonRequest", JSON.stringify(studentPayload)); // backend expects string
  formData.append("studentPhoto", photoFile);     // backend expects file

  return this.httpClient.post<any>(
    `${this.baseUrl}/register-student-with-photo`,
    formData
  );
}

  registerVolunteer(payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.REGISTER_VOLUNTEER}`;
    payload["roles"] = ["VOLUNTEER"];
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  computeFinalResults(payload): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.COMPUTE_FINAL_RESULTS}`;
   // payload["roles"] = ["SUPER-ADMIN"];
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  getZones(): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.ZONES}`;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  updateStudent(payload, studentId: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GET_STUDENT}/${studentId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.put(apiUrl, payload, httpOptions);
  }
  // Gallery
  addGallery(payload, endUrl): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GALLERY}/${endUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/x-www-form-urlencoded",
        auth_token: this.token,
      }),
    };
    return this.httpClient.post(apiUrl, payload, httpOptions);
  }

  getGalleryImages(mediaType : string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GALLERY}/${mediaType}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  getAllGalleryImages(mediaType : string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GALLERY_EDIT}/${mediaType}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }
  updateGalleryAssetStatus(payload, endUrl): Observable<any> {
    const apiUrl = `${this.baseUrl}/${CONSTANTS.GALLERY}?mediaUrl=${endUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/x-www-form-urlencoded",
        auth_token: this.token,
      }),
    };
    return this.httpClient.put(apiUrl, payload, httpOptions);
  }
  /**
   * @param message response message
   * @description to show success or warning message through api response message
   */
  genericMessage(message, type) {
    this.internalNotifier.next({
      type: "dru-alert",
      value: {
        alertType: type,
        htmlContent: message,
        position: "v-bottom",
        duration: 4000,
      },
    });
  }
  searchStudent(payload: any) {
    return this.httpClient.post(`${this.baseUrl}/students/search`, payload);
  }

  verifyStudent(userName: string) {
    return this.httpClient.put(`${this.baseUrl}/students/${userName}/verify`, {});
  }

  uploadStudentPhoto(userName: string, formData: FormData) {
    return this.httpClient.post(`${this.baseUrl}/uploadPhoto/${userName}`, formData);
  }

  searchSchools(name?: string, district?: string): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.set("name", name);
    }
    if (district) {
      params = params.set("district", district);
    }
    const apiUrl = `${this.baseUrl}/schools/search`;
    return this.httpClient.get(apiUrl, { params });
  }

  updateSchool(school: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/editSchool/${school.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.put(apiUrl, school, httpOptions);
  }

  createSchool(school: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/schoolRegister`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        auth_token: this.token,
      }),
    };
    return this.httpClient.post(apiUrl, school, httpOptions);
  }
}

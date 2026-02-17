import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-final-results",
  templateUrl: "./final-results.component.html",
  styleUrls: ["./final-results.component.scss"],
})
export class FinalResultsComponent implements OnInit {
  finalResult: Array<any> = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.finalResult = [
    //   {Name: "PITLA TEJASWINI", parentName: "KIRAN", school: "ZPHS (GIRLS) GEETHANAGAR", zone: "KARIMNAGAR", rankinOpenCategory: "2", questionsSolved: "7", score: "10.652448"},
    //   {Name: "KALE ABHISHEK", parentName: "SANJAY", school: "ZPHS VISHNUPURI", zone: "NANDED", rankinOpenCategory: "3", questionsSolved: "7", score: "10.434682"},
    //   {Name: "BOMMIDI AKHIL", parentName: "BOMMIDI SUJATHA ", school: "TSMS RUKMAPUR", zone: "KARIMNAGAR", rankinOpenCategory: "4", questionsSolved: "6", score: "10.034357"},
    //   {Name: "KAMALE ANIKET", parentName: "MARTAND ", school: "ZPHS KUNTUR", zone: "NANDED", rankinOpenCategory: "5", questionsSolved: "6", score: "9.475275"},
    //   {Name: "VELIDE PRAVEEN", parentName: "VELIDE RADHIKA", school: "GOVT HIGH SHOOL NARENDRA NAGAR", zone: "WARANGAL", rankinOpenCategory: "6", questionsSolved: "6", score: "9.393681"},
    //   {Name: "SRIPATHI SIDDARTH", parentName: "DAMODAR", school: "ZPHS KATLAKUNTA", zone: "KARIMNAGAR", rankinOpenCategory: "7", questionsSolved: "6", score: "9.375546"},
    //   {Name: "MAHESHUNI JASHWANTH", parentName: " RAJENDAR", school: "T.S.MODEL SCHOOL", zone: "KARIMNAGAR", rankinOpenCategory: "8", questionsSolved: "6", score: "8.962731"},
    //   {Name: "VODNALA VIDYANTH", parentName: "CHANDRASHEKAR ", school: "ZPHS KOTHAPALLY, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "9", questionsSolved: "5", score: "8.248155"},
    //   {Name: "ANNALDAS HANSIKA", parentName: "A.LAXMINARAYANA", school: "ZPHS BOYS SIRICILLA, SRL", zone: "KARIMNAGAR", rankinOpenCategory: "10", questionsSolved: "5", score: "8.125283"},
    //   {Name: "AMIREDDY ABHYUDAYA", parentName: "MALLAREDDY", school: "KGBV  ALLIPUR", zone: "KARIMNAGAR", rankinOpenCategory: "10", questionsSolved: "5", score: "8.125283"},
    //   {Name: "ERUGHADINDLA MANYATHA", parentName: "E.LINGASWAMY", school: "ZPHS NERADA", zone: "SURYAPET", rankinOpenCategory: "12", questionsSolved: "5", score: "8.078149"},
    //   {Name: "GOLLAPELLI AKSHAYA", parentName: "GOLLAPELLI KAMALA CHARY, RAMADEVI ", school: "ZPHS KOTHAPALLY, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "13", questionsSolved: "5", score: "8.070185"},
    //   {Name: "NAMPALLY SHALINI", parentName: "SAMPATH", school: "ZPHS GIRLS JULAPALLI", zone: "KARIMNAGAR", rankinOpenCategory: "14", questionsSolved: "5", score: "8.035725"},
    //   {Name: "GADDAM NAVADEEP", parentName: "GADDAM VENKATESHAM", school: "ZPHS (GIRLS) GEETHANAGAR", zone: "KARIMNAGAR", rankinOpenCategory: "15", questionsSolved: "5", score: "7.899951"},
    //   {Name: "VENNAPUSA SARASWATHI", parentName: "ANJI REDDY", school: "AP MODEL SCHOOL, VIPPARALA REDDY PALEM", zone: "GUNTUR", rankinOpenCategory: "16", questionsSolved: "5", score: "7.868582"},
    //   {Name: "YASHWANTH BATHINI YASHWANTH", parentName: "GANGARAJU ", school: "ZPHS KOTHAPALLY, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "17", questionsSolved: "5", score: "7.833187"},
    //   {Name: "THOUTAM NAMRATHA", parentName: "SURESH", school: "GOVT HIGH SHOOL NARENDRA NAGAR", zone: "WARANGAL", rankinOpenCategory: "18", questionsSolved: "5", score: "7.793026"},
    //   {Name: "DUDIPALA DEVI SHASHI KUMAR", parentName: "DUDIPALA SATHISH BABU", school: "ZPHS KURAVI", zone: "WARANGAL", rankinOpenCategory: "19", questionsSolved: "5", score: "7.758566"},
    //   {Name: "KOTHAPALLY VYSHNAVI", parentName: "SRINIVAS", school: "ZPHS KESHAVAPATNAM, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "20", questionsSolved: "5", score: "7.711432"},
    //   {Name: "CHERUKU KARTHIK", parentName: "CHERUKU VENKAT RAJU", school: "GOVT HIGH SHOOL NARENDRA NAGAR", zone: "WARANGAL", rankinOpenCategory: "21", questionsSolved: "5", score: "7.678901"},
    //   {Name: "CHITHALURI BHANU PRAKASH", parentName: "SRIHARI", school: "TSMS THIRUMALAGIRI", zone: "SURYAPET", rankinOpenCategory: "27", questionsSolved: "4", score: "6.475232"},
    //   {Name: "NAKIREKANTI SAHANA", parentName: "BHARGAV", school: "TSMS PENPAHAD", zone: "SURYAPET", rankinOpenCategory: "29", questionsSolved: "4", score: "6.460401"},
    //   {Name: "AMBAT LASHWIKA", parentName: "SATYANARSYANA", school: "ZPHS AMBARIPET", zone: "KARIMNAGAR", rankinOpenCategory: "30", questionsSolved: "4", score: "6.435071"},
    //   {Name: "ANTHAGIRI ANUSRI", parentName: "ANJAIAH", school: "ZPHS ANNARAM, MANAKONDUR", zone: "KARIMNAGAR", rankinOpenCategory: "37", questionsSolved: "4", score: "6.353477"},
    //   {Name: "RATHANAKARAM TEJASWINI", parentName: "SAIRAJU", school: "ZPHS GUNDLAPALLI", zone: "GUNTUR", rankinOpenCategory: "39", questionsSolved: "4", score: "6.257863"},
    //   {Name: "BHUKYA GOPICHAND", parentName: "BABU", school: "ZPHS RAMAPURAM", zone: "SURYAPET", rankinOpenCategory: "41", questionsSolved: "4", score: "6.234145"},
    //   {Name: "BHUKYA MANIKANTA", parentName: "BADD", school: "ZPHS RAMAPURAM", zone: "SURYAPET", rankinOpenCategory: "42", questionsSolved: "4", score: "6.215440"},
    //   {Name: "MANUPAKA VARALAXMI", parentName: "VENKATESHWARLU", school: "ZPHS GIRLS MANAKONDUR, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "43", questionsSolved: "4", score: "6.183242"},
    //   {Name: "MACHA MADHUMITHA", parentName: "MACHA JAYANTH", school: "ZPHS GIRLS SIRICILLA,SRL", zone: "KARIMNAGAR", rankinOpenCategory: "43", questionsSolved: "4", score: "6.183242"},
    //   {Name: "PENTI MONIKA", parentName: "VENKATESHAM , SUJATHA", school: "ZPHS KOTHAPALLY, KNR", zone: "KARIMNAGAR", rankinOpenCategory: "45", questionsSolved: "4", score: "6.183242"},
    //   {Name: "MARYADHA ANUSHKA", parentName: "MALLAIAH ", school: "ZPHS SOLIPET", zone: "SURYAPET", rankinOpenCategory: "46", questionsSolved: "4", score: "6.151455"},
    //   {Name: "VUCHIDI YASHASHWITHA", parentName: "SURENDER REDDY", school: "ZPHS ALMASPUR", zone: "KARIMNAGAR", rankinOpenCategory: "55", questionsSolved: "4", score: "6.068849"},
    //   {Name: "KAVHALE VAISHNAVI", parentName: "SHANKAR", school: "ZPHS VISHNUPURI", zone: "NANDED", rankinOpenCategory: "64", questionsSolved: "4", score: "5.956094"},
    //   {Name: "KORBANWAD SHRADDHA", parentName: "MUKUND", school: "ZPHS BARAD", zone: "NANDED", rankinOpenCategory: "66", questionsSolved: "4", score: "5.953961"},
    //   {Name: "METIKALA KUSUMITHA", parentName: "RAMAKRISHNA", school: "ZPHS (G) HUZURNAGAR", zone: "SURYAPET", rankinOpenCategory: "68", questionsSolved: "4", score: "5.941158"},
    //   {Name: "KOTA PALLAVI", parentName: "VEERAIAH", school: "ZPHS GORENTLA", zone: "SURYAPET", rankinOpenCategory: "69", questionsSolved: "4", score: "5.923485"},
    //   {Name: "DHARAVATH VISHAL", parentName: "DHARAVATH RAV I", school: "TSMS CHILKODU", zone: "KHAMMAM", rankinOpenCategory: "72", questionsSolved: "4", score: "5.819488"},
    //   {Name: "CHALLA UMA", parentName: "RAVI", school: "ZPHS (G) HUZURNAGAR", zone: "SURYAPET", rankinOpenCategory: "77", questionsSolved: "3", score: "5.136905"},
    //   {Name: "KATAKAN SAI", parentName: "VEERABHADRAK", school: "GHS SANTHI NAGAR", zone: "KHAMMAM", rankinOpenCategory: "79", questionsSolved: "3", score: "5.030743"},
    //   {Name: "GOLI SANJANA SRI", parentName: "RAMESH", school: "ZPHS BOYS KAMALAPUR", zone: "WARANGAL", rankinOpenCategory: "80", questionsSolved: "3", score: "5.029981"},
    //   {Name: "RACHCHA AKANKSHA", parentName: "RAJU", school: "ZPHS SCHOOL PALAKURTHY", zone: "WARANGAL", rankinOpenCategory: "94", questionsSolved: "3", score: "4.859746"},
    //   {Name: "KOLA VISHAL", parentName: "K. VIJAY KUMAR", school: "ZPHS KORRAJULAGUTTA", zone: "KHAMMAM", rankinOpenCategory: "104", questionsSolved: "3", score: "4.785019"},
    //   {Name: "AMARAJU AKSHAYA", parentName: "SRINIVAS", school: "ZPHS BOLLIKUNTA", zone: "WARANGAL", rankinOpenCategory: "113", questionsSolved: "3", score: "4.737885"},
    //   {Name: "RAYARAKULA SWATHI", parentName: "UPENDAR", school: "GHS MARKAZI", zone: "WARANGAL", rankinOpenCategory: "123", questionsSolved: "3", score: "4.630465"},
    //   {Name: "MITTAPALLY SUHANI", parentName: "KAVITHA", school: "GOVT HIGH SHOOL NARENDRA NAGAR", zone: "WARANGAL", rankinOpenCategory: "123", questionsSolved: "3", score: "4.630465"},
    //   {Name: "BANALA GANESH", parentName: "SRINIVAS", school: "ZPHS PANDILLAPALLI", zone: "KHAMMAM", rankinOpenCategory: "136", questionsSolved: "3", score: "4.591067"},
    //   {Name: "MOHAMMAD SADIYA FIRDOUSE", parentName: "MOHAMMAD ABDUL KALEEM", school: "GOVT GIRLS HIGH SCHOOL", zone: "KHAMMAM", rankinOpenCategory: "139", questionsSolved: "3", score: "4.567651"},
    //   {Name: "ANNEGANI PUJITHA", parentName: "NAGA UPENDAR ", school: "ZPHS PAMMI", zone: "KHAMMAM", rankinOpenCategory: "161", questionsSolved: "3", score: "4.378637"},
    //   {Name: "GUDA KAVYA", parentName: "GUDA SANJEEVA REDDY", school: "ZPHS SANTHAGUDIPADU", zone: "GUNTUR", rankinOpenCategory: "175", questionsSolved: "3", score: "4.307894"},
    //   {Name: "THUPAKULA SOWJANYA", parentName: "UPENDRA", school: "GOVT HIGH SCHOOL, NAGULAVANCHA", zone: "KHAMMAM", rankinOpenCategory: "181", questionsSolved: "3", score: "4.258909"},
    //   {Name: "PANUGANTI LAKSHMIDEVI", parentName: "RAMAYYACHARI", school: "ZPHS REDDYPALEM", zone: "GUNTUR", rankinOpenCategory: "184", questionsSolved: "3", score: "4.088674"},
    // ];
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getFinalResults().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res && res.length) {
            this.finalResult = res;
          }
        }
      );
    } catch(e) {
      console.warn(e);
    }
  }
}

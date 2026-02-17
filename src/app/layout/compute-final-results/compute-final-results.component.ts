

  import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-compute-final-results',
  templateUrl: './compute-final-results.component.html',
  styleUrls: ['./compute-final-results.component.scss']
})
export class ComputeFinalResultsComponent implements OnInit {
  zones: any[] = [];
  config: { [zoneId: string]: { open: number, zphs: number, girls: number } } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.apiService.getZones().subscribe(
      (res) => {
        console.log(res);
        this.zones = res;
        this.zones.forEach(zone => {
          this.config[zone.id] = { open: 0, zphs: 0, girls: 0 };
        });
      },
      (err) => {
        console.error("Failed to fetch zones", err);
        alert("Failed to load zones.");
      }
    );
  }

  saveConfiguration(): void {
    const payload = { zones: this.zones.map(zone => ({
      zone: zone.zoneName,
      open: this.config[zone.id]?.open || 0,
      zphs: this.config[zone.id]?.zphs || 0,
      girls: this.config[zone.id]?.girls || 0
    }))};

    this.apiService.computeFinalResults(payload).subscribe(
      (res) => {
        console.log(res);
        if (res && typeof res === "string") {
          const response = JSON.parse(res);
           console.log(response.message);
          if (response && response.message) {
                this.apiService.genericMessage(response.message, "success");
          }
          else {
            this.apiService.genericMessage(response.message, "failed");
          }
        }
       
     
  });
}
} 
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  allUsers: any = [];
  allRoles: Array<string> = [];
  filteredUsers: any = [];
  activeTab: 'roles' | 'users' = 'users';
  searchQuery = '';
  roleFilter = 'all';
  roleStats: any = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.allRoles = this.apiService.getAllRoles();
    this.getAllUsers();
    this.calculateRoleStats();
  }

  switchTab(tab: 'roles' | 'users') {
    this.activeTab = tab;
  }

  filterUsers() {
    let filtered = [...this.allUsers];

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        (user.studentName && user.studentName.toLowerCase().includes(query)) ||
        (user.userName && user.userName.toLowerCase().includes(query))
      );
    }

    // Filter by role
    if (this.roleFilter !== 'all') {
      filtered = filtered.filter(user =>
        user.userRoles && user.userRoles.indexOf(this.roleFilter) > -1
      );
    }

    this.filteredUsers = filtered;
  }

  calculateRoleStats() {
    this.roleStats = {};
    this.allRoles.forEach(role => {
      this.roleStats[role] = {
        count: 0,
        description: this.getRoleDescription(role)
      };
    });

    this.allUsers.forEach(user => {
      if (user.userRoles) {
        user.userRoles.forEach(role => {
          if (this.roleStats[role]) {
            this.roleStats[role].count++;
          }
        });
      }
    });
  }

  getRoleDescription(role: string): string {
    const descriptions = {
      'ADMIN': 'Full system access and management',
      'EVALUATOR': 'Can evaluate and grade papers',
      'STUDENT': 'Student portal access',
      'VIEWER': 'Read-only access to system',
      'MANAGER': 'Manage users and content'
    };
    return descriptions[role] || 'Role description';
  }

  getRoleColor(role: string): string {
    const colors = {
      'ADMIN': '#ef4444',
      'EVALUATOR': '#3b82f6',
      'STUDENT': '#10b981',
      'VIEWER': '#6b7280',
      'MANAGER': '#8b5cf6'
    };
    return colors[role] || '#6b7280';
  }

  hasRole(user: any, role: string): boolean {
    return user.assignedRoles && user.assignedRoles[role];
  }
  getAllUsers() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getAllUsers().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res && res.length) {
            this.allUsers = res;
            this.allUsers = this.allUsers.map(val => {
              val.assignedRoles = {};
              val.isEdit = false;
              this.allRoles.forEach(role => {
                if (val.userRoles && val.userRoles.indexOf(role) > -1) {
                  val.assignedRoles[role] = true;
                } else {
                  val.assignedRoles[role] = false;
                }
              });
              return val;
            });
            this.filteredUsers = [...this.allUsers];
            this.calculateRoleStats();
            console.log('this.allUsers:', this.allUsers);
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          if (error.error) {
            const serverError =
              typeof error.error === 'string' ? JSON.parse(error.error) : {};
            this.apiService.genericMessage(
              serverError.error || 'something went wrong',
              'error'
            );
          }
          console.log(error);
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }
  editUserRoles(user) {
    // Reset all users to non-edit mode
    this.allUsers = this.allUsers.map(val => {
      val.isEdit = false;
      return val;
    });
    this.filteredUsers = this.filteredUsers.map(val => {
      val.isEdit = false;
      return val;
    });
    // Find and set the specific user to edit mode
    const userInAll = this.allUsers.find(u => u.userName === user.userName);
    const userInFiltered = this.filteredUsers.find(u => u.userName === user.userName);
    if (userInAll) userInAll.isEdit = true;
    if (userInFiltered) userInFiltered.isEdit = true;
  }

  updateRoles(user) {
    try {
      const roles = [];
      Object.keys(user.assignedRoles).forEach(key => {
        if (user.assignedRoles[key]) {
          roles.push(key);
        }
      });
      this.apiService.showLoader.next(true);
      this.apiService.updateUserRoles(user.userName, { roles: roles.join(',') }).subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          console.log('res:', res);
          user.isEdit = false;
          this.getAllUsers();
          if (res && res.length) {
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          // if (error.status === 401) {
          //   this.router.navigate(['/login']);
          //   return;
          // }
          if (error.error) {
            const serverError =
              typeof error.error === 'string' ? JSON.parse(error.error) : {};
            this.apiService.genericMessage(
              serverError.error || 'something went wrong',
              'error'
            );
          }
          console.log(error);
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }

}

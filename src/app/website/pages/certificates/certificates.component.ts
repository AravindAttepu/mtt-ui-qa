import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

    certificates = [
        {
            title: 'Society / Trust / Section 8',
            label: 'NGO Registration Certificate',
            description: 'Registration certificate under Indian laws establishing the NGO as a legal entity.',
            icon: '📜',
            link: '/assets/docs/sadisha-organisation.pdf'
        },
        {
            title: 'PAN Card',
            label: 'NGO PAN Card',
            description: 'Permanent Account Number issued by the Income Tax Department in the NGO\'s name.',
            icon: '💳',
            link: '/assets/docs/sadisha-pan.pdf'
        },
        {
            title: '12A Certificate',
            label: 'Income Tax Exemption Certificate',
            description: 'Registration under Section 12A of the IT Act, enabling tax-exempt status for NGO income.',
            icon: '📑',
            link: '/assets/docs/sadisha_12A.pdf'
        },
        {
            title: '80G Certificate',
            label: 'Donation Tax Benefit Certificate',
            description: 'Registration under Section 80G, allowing donors to claim tax deductions on contributions.',
            icon: '💰',
            link: '/assets/docs/sadisha_80G.pdf'
        },
        {
            title: 'NGO Darpan / NITI Aayog',
            label: 'NITI Aayog Registration',
            description: 'Registration with the Government of India\'s NGO portal for transparency and tracking.',
            icon: '🏢',
            link: '/assets/docs/darpan.pdf'
        },
        {
            title: 'FCRA Certificate',
            label: 'Foreign Contribution Regulation Act',
            description: 'Registration allowing the NGO to receive foreign contributions for social work.',
            icon: '🌍',
            link: '/assets/docs/sadisha-fcra.pdf'
        }
        // {
        //     title: 'CSR Registration',
        //     label: 'CSR-1 Certificate',
        //     description: 'Registration with the MCA to undertake Corporate Social Responsibility activities.',
        //     icon: '🤝',
        //     link: '/assets/docs/sadisha-csr.pdf'
        // }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}

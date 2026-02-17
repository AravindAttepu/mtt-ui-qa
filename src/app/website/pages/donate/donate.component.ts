import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { SEOService } from '../../../seo.service';

declare var Razorpay: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  donationForm: FormGroup;
  selectedAmount: number | null = null;
  citizenshipType: 'indian' | 'international' = 'indian';
  customAmount: string = '';
  isProcessing: boolean = false;
  showQRCode: boolean = false;
  qrCodeUrl: string = '';
  qrPaymentCompleted: boolean = false;
  paymentMethod: 'razorpay' | 'upi' = 'razorpay';
  donationType: 'onetime' | 'monthly' = 'onetime';

  // Razorpay configuration
  // IMPORTANT: Replace with your actual Razorpay Key ID
  razorpayKeyId: string = 'rzp_test_Ny11uTWgNKU2OD'; // Replace with actual key

  // Preset donation amounts in INR
  presetAmounts = [500, 1000, 2000, 5000, 10000, 25000];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private seo: SEOService,
    private ngZone: NgZone
  ) {
    this.seo.updateTitle('Donate to Sadisha Foundation | Support Rural Education');
    this.seo.updateDescription('Donate to Sadisha Foundation to support education for rural students in India. Pay securely via UPI, Cards, or Net Banking.');
  }

  ngOnInit(): void {
    this.initializeDonationForm();
  }

  initializeDonationForm() {
    this.donationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      panNumber: [''],
      message: ['']
    });
  }

  selectCitizenship(type: 'indian' | 'international') {
    this.citizenshipType = type;
    this.selectedAmount = null;
    this.customAmount = '';
    this.showQRCode = false;
  }

  selectPaymentMethod(method: 'razorpay' | 'upi') {
    this.paymentMethod = method;
    this.showQRCode = false;
    this.qrPaymentCompleted = false;
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = '';
    this.showQRCode = false;
  }

  onCustomAmountChange(event: any) {
    const value = event.target.value;
    this.customAmount = value;
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1) {
      this.selectedAmount = numValue;
    } else {
      this.selectedAmount = null;
    }
    this.showQRCode = false;
  }

  getFinalAmount(): number {
    return this.selectedAmount || 0;
  }

  // Generate UPI QR Code
  generateUPIQRCode() {
    const amount = this.getFinalAmount();
    if (amount < 1) {
      this.showAlert('warning', 'Please select or enter a donation amount.');
      return;
    }

    // UPI payment link format
    const upiId = 'sadishafoundation@sbi'; // Replace with actual UPI ID
    const payeeName = 'Sadisha Foundation';
    const transactionNote = 'Donation to Sadisha Foundation';

    // Generate UPI deep link
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // Use QR code API to generate QR image
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
    this.showQRCode = true;
  }

  // Initiate Razorpay Payment
  initiateRazorpayPayment() {
    const amount = this.getFinalAmount();

    if (amount < 1) {
      this.showAlert('warning', 'Please select or enter a donation amount.');
      return;
    }

    if (!this.donationForm.valid) {
      this.showAlert('warning', 'Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    this.isProcessing = true;

    const options = {
      key: this.razorpayKeyId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Sadisha Foundation',
      description: 'Donation for Rural Education',
      image: 'https://sadisha.org/assets/images/sadisha.png',
      prefill: {
        name: this.donationForm.value.fullName,
        email: this.donationForm.value.email,
        contact: this.donationForm.value.phone
      },
      notes: {
        pan: this.donationForm.value.panNumber || '',
        message: this.donationForm.value.message || ''
      },
      theme: {
        color: '#1976d2'
      },
      handler: (response: any) => {
        this.ngZone.run(() => {
          this.handlePaymentSuccess(response);
        });
      },
      modal: {
        ondismiss: () => {
          this.ngZone.run(() => {
            this.isProcessing = false;
          });
        }
      }
    };

    // Check if Razorpay is loaded
    if (typeof (window as any).Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      this.isProcessing = false;
      this.showAlert('danger', 'Payment gateway not loaded. Please refresh the page and try again.');
      return;
    }

    // Check if key is configured
    if (this.razorpayKeyId === 'rzp_test_YOUR_KEY_ID' || !this.razorpayKeyId) {
      console.error('Razorpay Key ID not configured');
      this.isProcessing = false;
      this.showAlert('warning', 'Payment gateway is being configured. Please use bank transfer for now or contact us.');
      return;
    }

    try {
      const optionsWithRoundedAmount = {
        ...options,
        amount: Math.round(amount * 100)
      };

      console.log('Opening Razorpay with options:', optionsWithRoundedAmount);
      const razorpay = new (window as any).Razorpay(optionsWithRoundedAmount);

      razorpay.on('payment.failed', (response: any) => {
        console.error('Razorpay Payment Failed Event:', response);
        this.ngZone.run(() => {
          this.handlePaymentFailure(response);
        });
      });
      razorpay.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
      this.isProcessing = false;
      this.showAlert('danger', 'Payment gateway error. Please try again or use bank transfer.');
    }
  }

  // Initiate UPI Payment via Razorpay (auto-detection enabled)
  initiateUPIPayment() {
    const amount = this.getFinalAmount();

    if (amount < 1) {
      this.showAlert('warning', 'Please select or enter a donation amount.');
      return;
    }

    if (!this.donationForm.valid) {
      this.showAlert('warning', 'Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    this.isProcessing = true;

    const options = {
      key: this.razorpayKeyId,
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (integer)
      currency: 'INR',
      name: 'Sadisha Foundation',
      description: 'Donation for Rural Education',
      image: 'https://sadisha.org/assets/images/sadisha.png',
      prefill: {
        name: this.donationForm.value.fullName,
        email: this.donationForm.value.email,
        contact: this.donationForm.value.phone
      },
      notes: {
        pan: this.donationForm.value.panNumber || '',
        message: this.donationForm.value.message || ''
      },
      theme: {
        color: '#4caf50'
      },
      // Force UPI as preferred method
      config: {
        display: {
          blocks: {
            upi: {
              name: 'Pay via UPI',
              instruments: [
                { method: 'upi' }
              ]
            }
          },
          sequence: ['block.upi'],
          preferences: {
            show_default_blocks: false
          }
        }
      },
      handler: (response: any) => {
        this.ngZone.run(() => {
          this.handlePaymentSuccess(response);
        });
      },
      modal: {
        ondismiss: () => {
          this.ngZone.run(() => {
            this.isProcessing = false;
          });
        }
      }
    };

    // Check if Razorpay is loaded
    if (typeof (window as any).Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      this.isProcessing = false;
      this.showAlert('danger', 'Payment gateway not loaded. Please refresh the page and try again.');
      return;
    }

    // Check if key is configured
    if (this.razorpayKeyId === 'rzp_test_YOUR_KEY_ID' || !this.razorpayKeyId) {
      console.error('Razorpay Key ID not configured');
      this.isProcessing = false;
      this.showAlert('warning', 'Payment gateway is being configured. Please use bank transfer for now or contact us.');
      return;
    }

    try {
      console.log('Opening Razorpay UPI with options:', options);
      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        console.error('Razorpay UPI Payment Failed Event:', response);
        this.ngZone.run(() => {
          this.handlePaymentFailure(response);
        });
      });
      razorpay.open();
    } catch (error) {
      console.error('Razorpay UPI Error:', error);
      this.isProcessing = false;
      this.showAlert('danger', 'UPI payment error. Please try again.');
    }
  }

  handlePaymentSuccess(response: any) {
    this.isProcessing = false;
    console.log('Payment Success:', response);

    // Log donation for records
    const donationData = {
      paymentId: response.razorpay_payment_id,
      amount: this.getFinalAmount(),
      donor: this.donationForm.value,
      timestamp: new Date().toISOString()
    };
    console.log('Donation Record:', donationData);

    this.showAlert('success', `🎉 Thank you for your generous donation of ₹${this.getFinalAmount()}! Payment ID: ${response.razorpay_payment_id}`);

    // Reset form
    this.donationForm.reset();
    this.selectedAmount = null;
    this.customAmount = '';
    this.showQRCode = false;
  }

  handlePaymentFailure(response: any) {
    this.isProcessing = false;
    console.error('Payment Failed:', response.error);
    this.showAlert('danger', `Payment failed: ${response.error.description}. Please try again.`);
  }

  showAlert(type: string, message: string) {
    this.apiService.internalNotifier.next({
      type: 'dru-alert',
      value: {
        alertType: type,
        htmlContent: message,
        position: 'v-center',
        duration: 5000
      }
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Confirm QR Payment (manual confirmation)
  confirmQRPayment() {
    this.qrPaymentCompleted = true;
    this.showAlert('success', `🎉 Thank you for your donation of ₹${this.getFinalAmount()}! We will send a confirmation to ${this.donationForm.value.email}.`);

    // Log donation for records
    const donationData = {
      paymentMethod: 'UPI QR',
      amount: this.getFinalAmount(),
      donor: this.donationForm.value,
      timestamp: new Date().toISOString()
    };
    console.log('QR Donation Record:', donationData);
  }

  // Reset payment to make another donation
  resetPayment() {
    this.qrPaymentCompleted = false;
    this.showQRCode = false;
    this.selectedAmount = null;
    this.customAmount = '';
    this.donationForm.reset();
  }
}

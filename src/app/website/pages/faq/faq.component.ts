import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqList = [];
  constructor() { }

  ngOnInit() {
    this.faqList = [
      {
        heading: 'More details on rewards, please?',
        description: 'This year (2025), First eighty rankers (class 10th) of the test from all zones will get free intermediate education in a corporate institution including hostel and mess fees. Only students from ZP, Model, Gurukul(TGSWREIS) or Kasturba (KGBV) schools in class 10th are eligible.',
        image: ''
      },
      {
        heading: 'More details about the exam, please?',
        description: `<p>It&rsquo;s an&nbsp;<strong>open book</strong>&nbsp;exam. That is, students can refer to any textbook or notes during the exam. Duration of this exam is&nbsp;<strong>60</strong>&nbsp;minutes and the question paper contains&nbsp;<strong>10</strong>&nbsp;problems. All the answers are positive integers. Candidates must carry their Aadhaar card and Hall Ticket to the exam.</p>

        <p>Most of the questions attempt to test the aptitude and analytical skills, rather than the knowledge of the syllabus. Every student may not get the same set of questions. Ordering of the questions in each set is unique along with the values in the question. The questions range from very easy to very hard. The&nbsp;<strong>scoring is relative</strong>. That is, marks for a correct answer is not fixed. It can vary between&nbsp;<strong>1 to 2 marks</strong>&nbsp;depending upon how many students have answered the question correctly. A very easy question solved by many people can fetch only 1.12 marks whereas a very hard question solved by very few can fetch 1.99 marks. To know more about the question paper preparation setup and evaluation process, please visit&nbsp;<a style="color:blue;" href="https://sadisha.org/mtt.html">Math Talent Test section</a>.</p>`,
        image: ''
      },
      {
        heading: 'Why your own exam? Why not award/reward class toppers?',
        description: 'Scoring in academics is not a good measure of aptitude of the student as it relies more on memorization. We believe that aptitude matters a lot in real life. Unfortunately, for students and parents only the academic scores are apparent today. There is little emphasis on problem solving skills and comprehension. We wish to encourage more meaningful education.',
        image: ''
      },
      {
        heading: 'How does a one-time-an-year event help students?',
        description: 'This would be a platform to test their performance in a larger sample. A student can take this test in class 10th. This will improve the awareness of math and competitive world at an early stage of a kid.',
        image: ''
      },
      {
        heading: 'Any stats?',
        description: 'Thousands of students take part in the exam every year. We have started in 2012 with one school, less than students and just 3 volunteers. Today we are a team of 260 and growing, covering thousands of schools in Karimnagar and across six other zones.',
        image: ''
      },
      {
        heading: 'Why extra attention on girls?',
        description: 'Please read about Gender Bias and the need of Women Empowerment.',
        image: ''
      },
      {
        heading: 'How can I contribute?',
        description: `<p>We strongly encourage you to take an initiation at your place. We will take care of the financial and logistic needs. If you are willing to volunteer, contact us at&nbsp;<a href="mailto:admin@sadisha.org">admin@sadisha.org</a>.<br />You may transfer the donations to the following account:<br /><br /><span style="color: blue;">Sadisha Foundation,<br />Savings Account: 630501068069,<br />ICICI Bank, IFSC: ICIC0006305,<br />HYDERABAD MAIN BRANCH, HIMAYAT NAGAR MAIN ROAD, HYDERABAD.<br /><br /></span>For any questions regarding the same, please contact&nbsp;<a style="color:blue" href="mailto:admin@sadisha.org">admin@sadisha.org</a>.</p>`,
        image: ''
      },
      {
        heading: 'I have more questions!!',
        description: `<p>Contact us at&nbsp;<a style="color:blue" href="mailto:admin@sadisha.org">admin@sadisha.org</a>&nbsp;or call us at +91-9550895968</p>`,
        image: ''
      },
    ];
  }

}

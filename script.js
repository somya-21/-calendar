class Calendar {
    constructor() {
        this.date = new Date();
        this.currentView = 'month';
        this.initializeElements();
        this.addEventListeners();
        this.renderCalendar();
    }

    initializeElements() {
        this.monthYear = document.getElementById('monthYear');
        this.prevBtn = document.getElementById('prevMonth');
        this.nextBtn = document.getElementById('nextMonth');
        this.todayBtn = document.getElementById('todayBtn');
        this.daysGrid = document.querySelector('.days-grid');
        this.viewButtons = document.querySelectorAll('.view-btn');
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        this.todayBtn.addEventListener('click', () => this.goToToday());
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view));
        });
    }

    navigate(direction) {
        if (this.currentView === 'month') {
            this.date.setMonth(this.date.getMonth() + direction);
        } else if (this.currentView === 'week') {
            this.date.setDate(this.date.getDate() + (direction * 7));
        } else {
            this.date.setDate(this.date.getDate() + direction);
        }
        this.renderCalendar();
    }

    goToToday() {
        this.date = new Date();
        this.renderCalendar();
    }

    changeView(view) {
        this.currentView = view;
        this.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.renderCalendar();
    }

    renderCalendar() {
        this.updateMonthYearDisplay();
        
        if (this.currentView === 'month') {
            this.renderMonthView();
        } else if (this.currentView === 'week') {
            this.renderWeekView();
        } else {
            this.renderDayView();
        }
    }

    updateMonthYearDisplay() {
        const options = { month: 'long', year: 'numeric' };
        this.monthYear.textContent = this.date.toLocaleDateString('en-US', options);
    }

    renderMonthView() {
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        const startDay = new Date(firstDay);
        startDay.setDate(startDay.getDate() - firstDay.getDay());

        this.daysGrid.innerHTML = '';
        const today = new Date();

        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = startDay.getDate();
            
            if (startDay.getMonth() !== this.date.getMonth()) {
                dayElement.classList.add('other-month');
            }
            
            if (this.isSameDay(startDay, today)) {
                dayElement.classList.add('today');
            }
            
            this.daysGrid.appendChild(dayElement);
            startDay.setDate(startDay.getDate() + 1);
        }
    }

    renderWeekView() {
        const startOfWeek = new Date(this.date);
        startOfWeek.setDate(this.date.getDate() - this.date.getDay());

        this.daysGrid.innerHTML = '';
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = startOfWeek.getDate();
            
            if (this.isSameDay(startOfWeek, today)) {
                dayElement.classList.add('today');
            }
            
            this.daysGrid.appendChild(dayElement);
            startOfWeek.setDate(startOfWeek.getDate() + 1);
        }
    }

    renderDayView() {
        this.daysGrid.innerHTML = '';
        const dayElement = document.createElement('div');
        dayElement.textContent = this.date.getDate();
        
        if (this.isSameDay(this.date, new Date())) {
            dayElement.classList.add('today');
        }
        
        this.daysGrid.appendChild(dayElement);
    }

    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});

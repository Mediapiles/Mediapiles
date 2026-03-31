// --- Data for Reels Showcase ---
const compressedShorts = [
    "A (1)-1.mp4", "A (2)-12.mp4", "A (3)-19.mp4", "A (4)-20.mp4", "A (5)-21.mp4",
    "A (6)-22.mp4", "A (7)-23.mp4", "A (8)-24.mp4", "A (9)-25.mp4", "A (10)-2.mp4",
    "A (11)-3.mp4", "A (12)-4.mp4", "A (13)-5.mp4", "A (14)-6.mp4", "A (15)-7.mp4",
    "A (16)-8.mp4", "A (17)-9.mp4", "A (18)-10.mp4", "A (19)-11.mp4", "A (20)-13.mp4",
    "A (21)-14.mp4", "A (22)-15.mp4", "A (23)-16.mp4", "A (24)-17.mp4", "A (25)-18.mp4"
];

const REELS_COUNT = 25; // 5 columns x 5 rows grid
const reelsData = compressedShorts.map((filename, i) => ({
    id: i + 1,
    title: `Viral Short #${i + 1}`,
    views: Math.floor(Math.random() * 500 + 50) + 'K',
    videoUrl: `Shorts/COmpres/${filename}`,
}));

// --- Data for Long Form Carousel ---
const longForms = [
    { id: 1, title: 'Cinematic Travel Vlog', videoUrl: 'Shorts/COmpres/1 (1)-1.mp4' },
    { id: 2, title: 'Tech Review Setup', videoUrl: 'Shorts/COmpres/1 (2)-2.mp4' },
    { id: 3, title: 'Podcast Full Episode', videoUrl: 'Shorts/COmpres/1 (3)-3.mp4' },
    { id: 4, title: 'Real Estate Tour', videoUrl: 'Shorts/COmpres/1 (4)-4.mp4' },
    { id: 5, title: 'Mini Documentary', videoUrl: 'Shorts/COmpres/1 (5)-5.mp4' },
];

// --- Data for Client Success Section ---
const clients = [
    {
        id: 'caffeinatedblogger',
        name: 'Caffeinated Blogger',
        logo: 'Clients/CaffeinatedBlogger.jpg',
        stats: {
            subscribers: '+15.2K',
            subDesc: 'Growth in 3 months',
            comments: '4,200+',
            commentsDesc: 'High engagement rate',
            sales: '12 Properties Sold',
            salesDesc: 'Directly from YouTube leads'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [5000, 5200, 4800, 5500, 6000, 5800],
            after: [12000, 25000, 45000, 80000, 150000, 210000]
        }
    },
    {
        id: 'enessyilmazer',
        name: 'Eness Yilmazer',
        logo: 'Clients/Eness Yilmazer.jpg',
        stats: {
            subscribers: '+45.5K',
            subDesc: 'Since editing rebrand',
            comments: '12,500+',
            commentsDesc: 'Community interaction',
            sales: '850+ Memberships',
            salesDesc: 'New online coaching clients'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [10000, 11000, 10500, 12000, 11500, 13000],
            after: [20000, 45000, 90000, 180000, 320000, 450000]
        }
    },
    {
        id: 'realestatereport',
        name: 'Real Estate Report',
        logo: 'Clients/Real.Estate.Report.jpg',
        stats: {
            subscribers: '+8.4K',
            subDesc: 'Organic subscribers',
            comments: '3,100+',
            commentsDesc: 'Product questions & hype',
            sales: '$145K Rev.',
            salesDesc: 'Attributed to short reels'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [2000, 2100, 2300, 2000, 2500, 2400],
            after: [15000, 30000, 55000, 95000, 120000, 185000]
        }
    },
    {
        id: 'sonusharma',
        name: 'Sonu Sharma',
        logo: 'Clients/Sonu Sharma.jpg',
        stats: {
             subscribers: '+110K',
            subDesc: 'Subscribers gained',
            comments: '45,000+',
            commentsDesc: 'Viral engagement peak',
            sales: '2,100+ Tickets',
            salesDesc: 'Event sales through shorts'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [50000, 55000, 52000, 60000, 58000, 65000],
            after: [80000, 150000, 350000, 800000, 1200000, 2500000]
        }
    },
    {
        id: 'theramseyshow',
        name: 'The Ramsey Show',
        logo: 'Clients/TheRamseyShow.jpg',
        stats: {
             subscribers: '+22.1K',
            subDesc: 'Growth in 4 months',
            comments: '6,800+',
            commentsDesc: 'Higher audience retention',
            sales: '45 New Clients',
            salesDesc: 'Through organic video reach'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [8000, 8500, 8200, 9000, 8800, 9500],
            after: [18000, 32000, 60000, 110000, 200000, 310000]
        }
    },
    {
        id: 'kallawaymarketing',
        name: 'Kallaway Marketing',
        logo: 'Clients/kallawaymarketing.jpg',
        stats: {
             subscribers: '+32.4K',
            subDesc: 'Subscribers added',
            comments: '18,200+',
            commentsDesc: 'Actionable discussion',
            sales: '320+ Course Sales',
            salesDesc: 'Driven by video content'
        },
        chartData: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            before: [15000, 16000, 15500, 17000, 16500, 18000],
            after: [25000, 50000, 120000, 250000, 400000, 600000]
        }
    }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initReels();
    initCarousel();
    initClients();
    
    // Massive Performance Optimization: Lazy Load Videos based on viewport visibility
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // True lazy loading: Only set the src when it is about to enter the viewport
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                    video.load();
                }
                
                setTimeout(() => {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(err => console.log("Lazyplay caught:", err));
                    }
                }, 150);
            } else {
                // Pause video and free up network bandwidth when off-screen
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { rootMargin: '200px', threshold: 0.01 });
    
    document.querySelectorAll('.lazy-video').forEach(vid => videoObserver.observe(vid));
});

// Initialize Reels Grid
function initReels() {
    const grid = document.getElementById('reelsGrid');
    reelsData.forEach((reel, index) => {
        const isFirstRow = index < 5;
        const card = document.createElement('div');
        card.className = 'reel-card';
        if (isFirstRow) {
            // Eager load first row for instant auto-play on initial website load
            card.innerHTML = `
                <video src="${reel.videoUrl}#t=0.001" class="reel-thumbnail" muted loop playsinline autoplay preload="metadata"></video>
                <div class="reel-overlay" style="pointer-events: none;">
                    <span class="reel-views"><i data-lucide="eye" style="width:16px; height:16px;"></i> ${reel.views}</span>
                </div>
            `;
        } else {
            // Lazy load the rest to prevent massive Vercel bandwidth usage
            card.innerHTML = `
                <video data-src="${reel.videoUrl}#t=0.001" class="reel-thumbnail lazy-video" muted loop playsinline preload="none"></video>
                <div class="reel-overlay" style="pointer-events: none;">
                    <span class="reel-views"><i data-lucide="eye" style="width:16px; height:16px;"></i> ${reel.views}</span>
                </div>
            `;
        }
        grid.appendChild(card);
    });
}

// Initialize Long Form Carousel
function initCarousel() {
    const carousel = document.getElementById('longCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    longForms.forEach(video => {
        const card = document.createElement('div');
        card.className = 'long-card';
        card.innerHTML = `
            <video data-src="${video.videoUrl}#t=0.001" class="lazy-video" style="width: 100%; height: 100%; object-fit: cover; display: block;" muted loop playsinline controls preload="none"></video>
        `;
        carousel.appendChild(card);
    });

    // Scroll Logic
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.long-card').offsetWidth + 32; // gap is 2rem (32px)
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.long-card').offsetWidth + 32;
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }
}

// Initialize Client Section & Chart
let performanceChart;
let liveUpdateInterval;

function initClients() {
    const logoContainer = document.getElementById('clientLogos');

    clients.forEach((client, index) => {
        const btn = document.createElement('button');
        btn.className = `client-logo-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `
            <div class="client-logo-img" style="overflow: hidden;">
                <img src="${client.logo}" alt="${client.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            ${client.name}
        `;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.client-logo-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateClientDashboard(client);
        });

        logoContainer.appendChild(btn);
    });

    // Load first client by default
    updateClientDashboard(clients[0]);
}

function updateClientDashboard(client) {
    // Update Stats
    const statsContainer = document.getElementById('clientStats');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <span class="stat-label">Subscriber Growth</span>
            <span class="stat-value" id="stat-subscribers">0</span>
            <span class="stat-desc">${client.stats.subDesc}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Engagement</span>
            <span class="stat-value" id="stat-comments">0</span>
            <span class="stat-desc">${client.stats.commentsDesc}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Conversion & Sales</span>
            <span class="stat-value" id="stat-sales">0</span>
            <span class="stat-desc">${client.stats.salesDesc}</span>
        </div>
    `;

    const animateStat = (id, finalStr) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        let targetNum = parseFloat(finalStr.replace(/[^0-9.]/g, ''));
        if (isNaN(targetNum)) {
            el.innerText = finalStr;
            return;
        }

        const duration = 1500;
        const frames = 30;
        let step = targetNum / frames;
        let current = 0;
        
        let timer = setInterval(() => {
            current += step;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            let displayNum = current % 1 === 0 ? current.toString() : current.toFixed(1);
            el.innerText = finalStr.replace(/[0-9.]+/, displayNum);
        }, duration / frames);
    };

    setTimeout(() => {
        animateStat('stat-subscribers', client.stats.subscribers);
        animateStat('stat-comments', client.stats.comments);
        animateStat('stat-sales', client.stats.sales);
    }, 50);

    // Re-initialize Lucide icons for new content if needed
    // (Lucide icons are injected via JS so this isn't strictly necessary for the static stats,
    // but good practice if icons are added to stats later).

    // Update Chart
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    if (performanceChart) {
        performanceChart.destroy();
    }

    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: client.chartData.labels,
            datasets: [
                {
                    label: 'Views (Before My Editing)',
                    data: client.chartData.before,
                    borderColor: '#999',
                    backgroundColor: 'rgba(153, 153, 153, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    borderDash: [5, 5]
                },
                {
                    label: 'Views (After My Editing)',
                    data: client.chartData.after,
                    borderColor: '#1E3F20', // Pakistan Green
                    backgroundColor: 'rgba(30, 63, 32, 0.2)', // Light Green semi-transparent
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Outfit',
                            size: 14
                        },
                        color: '#1E3F20' /* Primary text color */
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30, 63, 32, 0.9)',
                    titleFont: { family: 'Outfit', size: 14 },
                    bodyFont: { family: 'Outfit', size: 13 },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { family: 'Outfit' },
                        callback: function(value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { family: 'Outfit' }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // Make chart container fixed height
    document.getElementById('performanceChart').parentElement.style.height = '400px';

    // Simulate Live Updates
    if (liveUpdateInterval) clearInterval(liveUpdateInterval);
    liveUpdateInterval = setInterval(() => {
        if (!performanceChart) return;
        
        const afterData = performanceChart.data.datasets[1].data;
        const lastScore = afterData[afterData.length - 1];
        
        // Boost randomly between 0.2% and 1.5% to look realistic
        afterData[afterData.length - 1] = Math.floor(lastScore + (lastScore * (Math.random() * 0.013 + 0.002)));
        
        performanceChart.update('none'); // Update gracefully without breaking animations
    }, 2000);
}

(function () {
  const STORAGE_KEY = 'bpt-lang';
  const DEFAULT_LANG = 'id';

  const dict = {
    'nav.home': { id: 'Beranda', en: 'Home' },
    'nav.growingPractice': { id: 'Praktik Budidaya', en: 'Growing Practice' },
    'nav.product': { id: 'Produk', en: 'Product' },
    'nav.aboutUs': { id: 'Tentang Kami', en: 'About Us' },
    'nav.blog': { id: 'Blog', en: 'Blog' },
    'cta.contactUs': { id: 'Hubungi Kami', en: 'Contact Us' },

    'footer.tagline': { id: 'Menghadirkan produk pertanian inovatif dan solusi nutrisi tanaman yang dirancang untuk membantu tanaman tumbuh lebih kuat, lebih sehat, dan lebih produktif.', en: 'Delivering innovative agricultural products and plant nutrition solutions designed to help crops grow stronger, healthier, and more productive.' },
    'footer.explore': { id: 'Jelajahi', en: 'Explore' },
    'footer.connect': { id: 'Terhubung', en: 'Connect' },
    'footer.addresses': { id: 'Alamat', en: 'Addresses' },
    'footer.email': { id: 'Email', en: 'Email' },
    'footer.copyright': { id: 'Bene Pyto Tani Jaya © 2026. Semua hak dilindungi.', en: 'Bene Pyto Tani Jaya © 2026. All rights reserved.' },

    'common.searchPlaceholder': { id: 'Cari berdasarkan judul atau tag', en: 'Search by title or tag' },
    'common.allTags': { id: 'Semua Tag', en: 'All Tags' },
    'common.sortFeatured': { id: 'Unggulan', en: 'Featured' },
    'common.sortTitleAsc': { id: 'Judul A-Z', en: 'Title A-Z' },
    'common.sortTitleDesc': { id: 'Judul Z-A', en: 'Title Z-A' },
    'common.learnMore': { id: 'Selengkapnya', en: 'Learn More' },

    'tag.BenSil+': { id: 'BenSil+', en: 'BenSil+' },
    'tag.Ornamental': { id: 'Tanaman Hias', en: 'Ornamental' },
    'tag.Aquarium Care': { id: 'Perawatan Akuarium', en: 'Aquarium Care' },
    'tag.Soil Health': { id: 'Kesehatan Tanah', en: 'Soil Health' },
    'tag.Pest Management': { id: 'Pengendalian Hama', en: 'Pest Management' },
    'tag.Water Management': { id: 'Manajemen Air', en: 'Water Management' },
    'tag.Nutrient Management': { id: 'Manajemen Nutrisi', en: 'Nutrient Management' },
    'tag.Crop Planning': { id: 'Perencanaan Tanam', en: 'Crop Planning' },
    'tag.Harvest Quality': { id: 'Kualitas Panen', en: 'Harvest Quality' },

    'index.badge.sustainingEarth': { id: 'Menjaga Bumi', en: 'Sustaining Earth' },
    'index.hero.titlePrefix': { id: 'Tumbuhkan Masa Depan Pertanian bersama', en: 'Grow the Future of Agriculture with' },
    'index.hero.subtitle': { id: 'Produsen tepercaya pupuk kimia dan solusi nutrisi tanaman, dipimpin oleh produk unggulan kami BenSil+, diformulasikan untuk membantu petani tumbuh lebih kuat, lebih sehat, dan menghasilkan panen yang lebih tinggi.', en: 'A trusted producer of chemical fertilizers and crop nutrition solutions, led by our flagship BenSil+, formulated to help farmers grow stronger, healthier, and higher yielding crops.' },
    'index.hero.ctaSeeProducts': { id: 'Lihat Produk Kami', en: 'See Our Products' },
    'index.hero.stat1Label': { id: 'Tingkat Kepuasan Pelanggan', en: 'Customer Satisfaction Rate' },
    'index.hero.stat2Label': { id: 'Tahun Pengalaman', en: 'Years of Experience' },
    'index.hero.stat3Label': { id: 'Petani di Seluruh Indonesia', en: 'Farmers Around Indonesia' },

    'index.growingPractice.title': { id: 'Praktik Terbaik untuk Budidaya Berkelanjutan', en: 'Best Practices for Sustainable Growing' },
    'index.growingPractice.subtitle': { id: 'Teknik budidaya praktis yang direkomendasikan agronom kami untuk menjaga hasil panen tetap tinggi dan tanah tetap sehat musim demi musim.', en: 'Practical growing techniques our agronomists recommend to keep yields high and soil healthy season after season.' },
    'index.growingPractice.viewAll': { id: 'Lihat Semua Praktik', en: 'View All Practices' },

    'index.products.badge': { id: 'Produk', en: 'Products' },
    'index.products.title': { id: 'Produk Inovatif untuk Pertanian Modern', en: 'Innovative Products for Modern Agriculture' },
    'index.products.subtitle': { id: 'Mulai dari produk unggulan kami BenSil+ hingga rangkaian lengkap formula nutrisi dan kesehatan tanaman, pupuk kimia kami membantu petani tumbuh lebih kuat, lebih sehat, dan menghasilkan panen yang lebih tinggi.', en: 'From our flagship BenSil+ to our full range of crop nutrition and plant health formulas, our chemical fertilizers help farmers grow stronger, healthier, and higher yielding crops.' },
    'index.products.viewAll': { id: 'Lihat Semua Produk', en: 'View All Products' },

    'index.about.title': { id: 'Memperkuat Hasil Panen di Seluruh Indonesia', en: 'Strengthening Harvests Across Indonesia' },
    'index.about.mission': { id: 'Bene Pyto Tani Jaya merupakan perusahaan agritech Indonesia yang menghadirkan produk dan solusi untuk mendukung kebutuhan budidaya tanaman. Melalui inovasi produk, edukasi, dan pendampingan, kami membantu petani menjaga kesehatan tanaman, meningkatkan produktivitas, dan membangun pertanian yang lebih berkelanjutan.', en: 'Bene Pyto Tani Jaya is an Indonesian agritech company delivering products and solutions to support crop cultivation needs. Through product innovation, education, and hands-on guidance, we help farmers maintain plant health, increase productivity, and build more sustainable agriculture.' },
    'index.about.stat1Title': { id: 'Tingkat Kepuasan Pelanggan', en: 'Customer Satisfaction Rate' },
    'index.about.stat1Desc': { id: 'Kami mengutamakan kebutuhan petani dengan menghadirkan pupuk yang andal untuk meningkatkan kesehatan tanaman dan membangun kepercayaan jangka panjang.', en: 'We prioritize farmer needs by delivering reliable fertilizers that improve crop health and build long-term trust.' },
    'index.about.stat2Title': { id: 'Tahun Pengalaman', en: 'Years of Experience' },
    'index.about.stat2Desc': { id: 'Dibangun dari pengetahuan pertanian yang mendalam dan wawasan lapangan nyata untuk menciptakan solusi yang benar-benar bekerja.', en: 'Built on deep agricultural knowledge and real-world farming insights to create solutions that truly work.' },
    'index.about.stat3Title': { id: 'Petani di Seluruh Dunia', en: 'Farmers Around the World' },
    'index.about.stat3Desc': { id: 'Mendukung petani di berbagai wilayah dengan solusi nutrisi tanaman yang membantu mereka tumbuh, berkembang, dan sukses.', en: 'Supporting farmers across regions with crop nutrition solutions that help them grow, scale, and succeed.' },

    'index.testimonials.badge': { id: 'Testimoni', en: 'Testimonials' },
    'index.testimonials.title': { id: 'Kata Para Petani Tentang Bene Pyto Tani Jaya', en: 'What Farmers Say About Bene Pyto Tani Jaya' },
    'index.testimonials.subtitle': { id: 'Kisah nyata dari petani yang menggunakan Bene Pyto Tani Jaya untuk bertani lebih cerdas, meningkatkan efisiensi, dan mencapai hasil yang lebih baik di seluruh operasi pertanian mereka.', en: 'Real stories from farmers using Bene Pyto Tani Jaya to grow smarter, improve efficiency, and achieve better results across their farming operations.' },

    'index.locations.badge': { id: 'Lokasi', en: 'Locations' },
    'index.locations.title': { id: 'Tempat Produk Kami Dijual', en: 'Where Our Products Are Sold' },
    'index.locations.subtitle': { id: 'Produk Bene Pyto Tani Jaya menjangkau petani di kota-kota di seluruh Indonesia. Ketuk sebuah kota untuk membuka lokasinya di Google Maps.', en: 'Bene Pyto Tani Jaya products reach farmers in cities across Indonesia. Tap a city to open its location on Google Maps.' },
    'index.locations.openMaps': { id: 'Buka di Maps', en: 'Open in Maps' },

    'productList.breadcrumb': { id: 'Produk', en: 'Products' },
    'productList.badge': { id: 'Produk', en: 'Products' },
    'productList.title': { id: 'Produk Inovatif untuk Pertanian Modern', en: 'Innovative Products for Modern Agriculture' },
    'productList.emptyState': { id: 'Tidak ada produk yang cocok dengan pencarian Anda.', en: 'No products match your search.' },
    'productList.sortPriceDesc': { id: 'Harga Tertinggi ke Terendah', en: 'Price High to Low' },
    'productList.sortPriceAsc': { id: 'Harga Terendah ke Tertinggi', en: 'Price Low to High' },
    'productList.resultCount': { id: '{n} produk ditemukan', en: '{n} {product} found' },

    'gpList.breadcrumb': { id: 'Praktik Budidaya', en: 'Growing Practice' },
    'gpList.badge': { id: 'Praktik Budidaya', en: 'Growing Practice' },
    'gpList.title': { id: 'Semua Praktik Budidaya', en: 'All Growing Practices' },
    'gpList.subtitle': { id: 'Setiap teknik yang direkomendasikan agronom kami untuk menjaga hasil panen tetap tinggi dan tanah tetap sehat musim demi musim, mulai dari kesehatan tanah dan pengendalian hama hingga kualitas panen.', en: 'Every technique our agronomists recommend to keep yields high and soil healthy season after season, from soil health and pest management to harvest quality.' },
    'gpList.emptyState': { id: 'Tidak ada praktik budidaya yang cocok dengan pencarian Anda.', en: 'No growing practices match your search.' },
    'gpList.sortDateDesc': { id: 'Tanggal Terbaru', en: 'Date Latest First' },
    'gpList.sortDateAsc': { id: 'Tanggal Terlama', en: 'Date Oldest First' },
    'gpList.resultCount': { id: '{n} praktik ditemukan', en: '{n} {practice} found' },

    'productDetail.breadcrumb': { id: 'Produk', en: 'Product' },
    'productDetail.chooseVariant': { id: 'Pilih Varian', en: 'Choose Variant' },
    'productDetail.variant': { id: 'Varian', en: 'Variant' },
    'productDetail.orderWhatsapp': { id: 'Pesan via WhatsApp', en: 'Order via WhatsApp' },
    'productDetail.contactUs': { id: 'Hubungi Kami', en: 'Contact Us' },
    'productDetail.recommendBadge': { id: 'Mungkin Anda Juga Suka', en: 'You Might Also Like' },
    'productDetail.moreProducts': { id: 'Lebih Banyak Produk {tag}', en: 'More {tag} Products' },

    'aboutUs.breadcrumb': { id: 'Tentang Kami', en: 'About Us' },
    'aboutUs.badge': { id: 'Tentang Kami', en: 'About Us' },
    'aboutUs.title': { id: 'Memperkuat Hasil Panen di Seluruh Indonesia', en: 'Strengthening Harvests Across Indonesia' },
    'aboutUs.stat1Title': { id: 'Tingkat Kepuasan Pelanggan', en: 'Customer Satisfaction Rate' },
    'aboutUs.stat2Title': { id: 'Tahun Pengalaman', en: 'Years of Experience' },
    'aboutUs.stat3Title': { id: 'Petani di Seluruh Dunia', en: 'Farmers Around the World' },
    'aboutUs.valuesBadge': { id: 'Nilai Kami', en: 'Our Values' },
    'aboutUs.valuesTitle': { id: 'Yang Kami Junjung Tinggi', en: 'What We Stand For' },
    'aboutUs.value1': { id: 'Jujur', en: 'Honest' },
    'aboutUs.value1Desc': { id: 'Kami berkomunikasi secara terbuka dan bertanggung jawab atas setiap produk dan janji yang kami buat kepada petani.', en: "We communicate openly and stand behind every product and promise we make to farmers." },
    'aboutUs.value2': { id: 'Berani', en: 'Bold' },
    'aboutUs.value2Desc': { id: 'Kami mengambil inisiatif dan tidak takut mencoba pendekatan baru untuk menyelesaikan masalah pertanian yang nyata.', en: "We take initiative and aren't afraid to try new approaches to solve real farming problems." },
    'aboutUs.value3': { id: 'Beri Nilai Tambah', en: 'Add Value' },
    'aboutUs.value3Desc': { id: 'Setiap produk dan keputusan diukur dari nilai nyata yang dibawanya bagi petani yang kami layani.', en: 'Every product and decision is measured by the real value it brings to the farmers we serve.' },
    'aboutUs.value4': { id: 'Kolaboratif', en: 'Collaborative' },
    'aboutUs.value4Desc': { id: 'Kami bekerja sama erat dengan petani, mitra, dan satu sama lain untuk mencapai hasil yang lebih baik bersama.', en: 'We work closely with farmers, partners, and each other to grow better outcomes together.' },
    'aboutUs.value5': { id: 'Efisien', en: 'Efficient' },
    'aboutUs.value5Desc': { id: 'Kami menggunakan sumber daya secara bijak, memangkas pemborosan dari operasi kami agar solusi tetap terjangkau.', en: 'We use resources wisely, cutting waste from our operations to keep solutions affordable.' },
    'aboutUs.value6': { id: 'Fokus pada Kekuatan', en: 'Focus on Strengths' },
    'aboutUs.value6Desc': { id: 'Kami membangun dari apa yang kami kuasai dan mengarahkan energi kami ke tempat yang memberikan dampak terbesar.', en: 'We build on what we do best and put our energy where it makes the biggest difference.' },
    'aboutUs.teamBadge': { id: 'Tim Kami', en: 'Our Team' },
    'aboutUs.teamTitle': { id: 'Kenali Orang-Orang di Balik Bene Pyto Tani Jaya', en: 'Meet the People Behind Bene Pyto Tani Jaya' },
    'aboutUs.role1': { id: 'Direktur Utama', en: 'Chief Executive Officer' },
    'aboutUs.role2': { id: 'Manajer Gudang', en: 'Warehouse Manager' },
    'aboutUs.role3': { id: 'Asisten Lapangan', en: 'Field Assistant' },
    'aboutUs.role4': { id: 'Asisten Pemasaran Penjualan', en: 'Sales Marketing Asistant' },
    'aboutUs.role5': { id: 'Spesialis Layanan Pelanggan', en: 'Customer Service Specialist' },
    'aboutUs.role6': { id: 'Admin Pemasaran', en: 'Admin Marketing' },
    'aboutUs.trustedTitle': { id: 'Dipercaya oleh petani, agribisnis, dan pemimpin rantai pasok', en: 'Trusted by farmers, agribusinesses, and supply chain leaders' },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
    window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  }

  function t(key, vars) {
    const entry = dict[key];
    let text = entry ? (entry[getLang()] || entry.en) : key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.replace('{' + k + '}', vars[k]);
      });
    }
    return text;
  }

  function apply() {
    const lang = getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('bg-primary', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('text-text-primary', !isActive);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });
  });

  window.i18n = { t, getLang, setLang, apply };
})();

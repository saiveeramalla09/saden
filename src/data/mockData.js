export const MOCK_USER_ROLES = {
  GUEST: 'GUEST',
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
};

export const MOCK_LAND_DATA = [
  {
    id: 'l1',
    title: '5 Acres Premium Agricultural Land',
    location: 'Shankarpalli, Hyderabad',
    coordinates: [17.4474, 78.1360],
    price: '₹ 2.5 Cr / Acre',
    totalPrice: '₹ 12.5 Cr',
    area: '5 Acres',
    gajamArea: 24200, // 5 * 4840
    type: 'Agricultural',
    verified: true,
    status: 'ACTIVE',
    owner: 's1',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    description: 'Fertile red soil land perfect for organic farming or farmhouse plotting. Clear Dharani titles and no litigation.'
  },
  {
    id: 'l2',
    title: '1200 Sq.Yards Commercial Plot',
    location: 'Gachibowli Extension',
    coordinates: [17.4399, 78.3489],
    price: '₹ 1.2 Lakh / Sq.Yd',
    totalPrice: '₹ 14.4 Cr',
    area: '1200 Sq.Yd',
    gajamArea: 1200, // 1 sqyd = 1 gajam
    type: 'Commercial',
    verified: true,
    status: 'ACTIVE',
    owner: 's2',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    description: 'Prime commercial plot on 100ft road. HMDA approved, perfect for a mid-tier IT park or retail complex.'
  },
  {
    id: 'l3',
    title: '10 Guntas Highway Facing',
    location: 'Sadashivpet, Mumbai Hwy',
    coordinates: [17.6186, 77.9405],
    price: '₹ 15 Lakhs / Gunta',
    totalPrice: '₹ 1.5 Cr',
    area: '10 Guntas',
    gajamArea: 1210, // 10 * 121
    type: 'Investment',
    verified: false,
    status: 'PENDING_ADMIN',
    owner: 's1',
    images: ['https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    description: 'Facing directly onto the NH-65 Mumbai Highway. Excellent future appreciation potential.'
  }
];

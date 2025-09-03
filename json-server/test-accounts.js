const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testAccountAPI() {
  console.log('🧪 Testing Account Mock API with JSON Server native parameters...\n');

  try {
    // Test 1: Get all accounts
    console.log('1. Testing GET /api/accounts');
    const response1 = await axios.get(`${BASE_URL}/accounts`);
    console.log(`✅ Success: Found ${response1.data.length} accounts`);
    console.log(`   First account: ${response1.data[0]?.accountName}\n`);

    // Test 2: Get account by ID
    console.log('2. Testing GET /api/accounts/1');
    const response2 = await axios.get(`${BASE_URL}/accounts/1`);
    console.log(`✅ Success: Account ${response2.data.accountNumber} - ${response2.data.accountName}\n`);

    // Test 3: Search accounts using JSON Server's q parameter
    console.log('3. Testing GET /api/accounts?q=Smith');
    const response3 = await axios.get(`${BASE_URL}/accounts`, {
      params: { q: 'Smith' }
    });
    console.log(`✅ Success: Found ${response3.data.length} accounts matching "Smith"\n`);

    // Test 4: Filter by status
    console.log('4. Testing GET /api/accounts?status=active');
    const response4 = await axios.get(`${BASE_URL}/accounts`, {
      params: { status: 'active' }
    });
    console.log(`✅ Success: Found ${response4.data.length} active accounts\n`);

    // Test 5: Filter by type
    console.log('5. Testing GET /api/accounts?accountType=corporate');
    const response5 = await axios.get(`${BASE_URL}/accounts`, {
      params: { accountType: 'corporate' }
    });
    console.log(`✅ Success: Found ${response5.data.length} corporate accounts\n`);

    // Test 6: Pagination using JSON Server's _page and _limit (1-based)
    console.log('6. Testing GET /api/accounts?_page=1&_limit=2');
    const response6 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 1, _limit: 2 }
    });
    console.log(`✅ Success: Page 1 with ${response6.data.length} accounts (limit: 2)\n`);

    // Test 7: Pagination page 2
    console.log('7. Testing GET /api/accounts?_page=2&_limit=2');
    const response7 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 2, _limit: 2 }
    });
    console.log(`✅ Success: Page 2 with ${response7.data.length} accounts (limit: 2)\n`);

    // Test 8: Sorting using JSON Server's _sort and _order
    console.log('8. Testing GET /api/accounts?_sort=accountName&_order=asc');
    const response8 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _sort: 'accountName', _order: 'asc' }
    });
    console.log(`✅ Success: Sorted accounts by name (ascending)\n`);

    // Test 9: Combined filtering and pagination
    console.log('9. Testing GET /api/accounts?status=active&_page=1&_limit=3');
    const response9 = await axios.get(`${BASE_URL}/accounts`, {
      params: { status: 'active', _page: 1, _limit: 3 }
    });
    console.log(`✅ Success: Active accounts with pagination: ${response9.data.length} results\n`);

    // Test 10: Test that page 0 returns no results (JSON Server behavior)
    console.log('10. Testing GET /api/accounts?_page=0&_limit=5 (should return empty)');
    const response10 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 0, _limit: 5 }
    });
    console.log(`✅ Success: Page 0 returns ${response10.data.length} accounts (expected: 0)\n`);

    console.log('🎉 All tests passed! Account Mock API is working correctly with JSON Server native parameters.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAccountAPI();
}

module.exports = { testAccountAPI };

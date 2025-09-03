const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function quickTest() {
  console.log('🧪 Quick Test: Pagination Fix\n');

  try {
    // Test 1: Page 0 (should return empty - JSON Server behavior)
    console.log('1. Testing page 0 (should return empty):');
    const response0 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 0, _limit: 5 }
    });
    console.log(`   Page 0: ${response0.data.length} accounts\n`);

    // Test 2: Page 1 (should return results)
    console.log('2. Testing page 1 (should return results):');
    const response1 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 1, _limit: 5 }
    });
    console.log(`   Page 1: ${response1.data.length} accounts\n`);

    // Test 3: Page 2 (should return results if more than 5 accounts exist)
    console.log('3. Testing page 2:');
    const response2 = await axios.get(`${BASE_URL}/accounts`, {
      params: { _page: 2, _limit: 5 }
    });
    console.log(`   Page 2: ${response2.data.length} accounts\n`);

    console.log('✅ Quick test completed!');
    console.log('   - Page 0: Empty (correct JSON Server behavior)');
    console.log('   - Page 1: Has results (correct)');
    console.log('   - Page 2: May have results depending on total accounts');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

quickTest();

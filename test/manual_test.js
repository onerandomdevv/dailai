const ussdController = require('../src/controllers/ussd.controller');

// Mock Request and Response
const mockReq = (text) => ({
    body: {
        sessionId: 'test_session_123',
        serviceCode: '*123#',
        phoneNumber: '+254700000000',
        text: text
    }
});

const mockRes = () => {
    const res = {};
    res.set = (key, value) => { console.log(`[Header] ${key}: ${value}`); };
    res.send = (body) => { console.log(`[Response] ${body}`); };
    return res;
};

// Test Cases
const runTests = async () => {
    console.log('--- Test 1: Main Menu (No Input) ---');
    await ussdController.handleUSSD(mockReq(''), mockRes());

    console.log('\n--- Test 2: Health Menu (Input "1") ---');
    await ussdController.handleUSSD(mockReq('1'), mockRes());

    console.log('\n--- Test 3: Health Submit (Input "1*headache") ---');
    await ussdController.handleUSSD(mockReq('1*headache'), mockRes());
    
    console.log('\n--- Test 4: Translator Menu (Input "2") ---');
    await ussdController.handleUSSD(mockReq('2'), mockRes());

    console.log('\n--- Test 5: Guide Menu (Input "3") ---');
    await ussdController.handleUSSD(mockReq('3'), mockRes());

    console.log('\n--- Test 6: Guide Select Topic (Input "3*1") ---');
    await ussdController.handleUSSD(mockReq('3*1'), mockRes());
};

runTests();

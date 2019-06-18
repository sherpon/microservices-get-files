jest.mock('@google-cloud/firestore');

const getMocks = () => {
  let __mockReq = {
    headers: {},
    get: function(header) {
      return this.headers[header];
    },
    method: '',
    body: {},
    query: {},
    params: {},
  };

  let __mockRes = {
    set: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
    status: jest.fn(),
  };

  return {
    req: __mockReq,
    res: __mockRes,
  };
};

describe('Test getFiles', () => {

  test('it should return the files array', async () => {
    const mockObjectRef = [
      [
        { 
          id: 'index.ejs',
          data: () => ({
            type: 'template',
            createdAt: '',
          }),
        },
        { 
          id: 'pages.ejs',
          data: () => ({
            type: 'template',
            createdAt: '',
          }),
        },
        { 
          id: 'about.ejs',
          data: () => ({
            type: 'page',
            createdAt: '',
            url: 'about',
            title: 'About',
          }),
        },
      ]
    ];
    require('@google-cloud/firestore').__setMockResultArray(mockObjectRef);
    const parameters = {
      header: {},
      query: {
        userId: '0okm9ijn8uhb',
        websiteId: '5tgb6yhn-7ujm-8ikl-cde3',
      },
      body: {},
    };
    let mocks = getMocks();
    mocks.req.method = 'GET';
    mocks.req.query = parameters.query;
    const microservice = require('./index');
    await microservice.getFiles(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(202);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  });

});
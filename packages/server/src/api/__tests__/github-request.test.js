const GithubRequestHandler = require('../github-request')

describe('GithubRequestHandler', () => {
  let sut
  let githubMgrMock = { findDidInGists: jest.fn() }
  let claimMgrMock = { issueGithub: jest.fn() }
  let analyticsMock = { trackRequestGithub: jest.fn() }

  beforeAll(() => {
    sut = new GithubRequestHandler(githubMgrMock, claimMgrMock, analyticsMock)
  })

  test('empty constructor', () => {
    expect(sut).not.toBeUndefined()
  })

  test('handle null body', done => {
    sut.handle({}, {}, (err, res) => {
      expect(err).not.toBeNull()
      expect(err.code).toEqual(400)
      expect(err.message).toBeDefined()
      done()
    })
  })

  test('no did', done => {
    sut.handle(
      {
        body: JSON.stringify({ other: 'other' })
      },
      {},
      (err, res) => {
        expect(err).not.toBeNull()
        expect(err.code).toEqual(403)
        expect(err.message).toEqual('no did')
        done()
      }
    )
  })

  test('no github handle', done => {
    sut.handle(
      {
        body: JSON.stringify({ did: 'did:https:test' })
      },
      {},
      (err, res) => {
        expect(err).not.toBeNull()
        expect(err.code).toEqual(400)
        expect(err.message).toEqual('no github handle')
        done()
      }
    )
  })

  test('happy path', done => {
    // githubMgrMock.findDidInGists.mockReturnValue('http://some.valid.url')
    // claimMgrMock.issueGithub.mockReturnValue('somejwttoken')
    //
    // sut.handle(
    //   {
    //     headers: { origin: 'https://subdomain.3box.io' },
    //     body: JSON.stringify({ did: 'did:https:test', github_handle: 'test' })
    //   },
    //   {},
    //   (err, res) => {
    //     expect(err).toBeNull()
    //     expect(res).toEqual({ verification: 'somejwttoken' })
    done()
    //   }
    // )
  })
})

pragma solidity ^0.5.0;

contract SuitList {
  uint256 public suitCount = 0;

  struct Suit {
    uint256 id;
    bytes32 userId;
    bytes32 userIdAccused;
    bytes32 content;
    bytes32 documentFile;
    bytes32 accusedContent;
    bytes32 accusedDocumentFile;
    bytes32 openDate;
    bytes32 closeDate;
    bytes32 verdict;
  }

  mapping(uint256 => Suit) public suits;

  event SuitCreated(
    uint256 id,
    bytes32 userId,
    bytes32 userIdAccused,
    bytes32 content,
    bytes32 documentFile,
    bytes32 accusedContent,
    bytes32 accusedDocumentFile,
    bytes32 openDate,
    bytes32 closeDate,
    bytes32 verdict
  );

  event SuitCompleted(
    uint256 id,
    bytes32 _closeDate,
    bytes32 verdict
  );

  constructor() public {
    createSuit('1','2','Anurag content', 'anurag', 'anurag', 'anurag', 'anurag', 'anurag', 'Passed');
  }

  function createSuit(
    bytes32 _userId,
    bytes32  _userIdAccused,
    bytes32  _content,
    bytes32  _accusedContent,
    bytes32  _documentFile,
    bytes32  _accusedDocumentFile,
    bytes32  _openDate,
    bytes32  _closeDate,
    bytes32  _verdict
  ) public {
    suitCount ++;
    suits[suitCount] = Suit(suitCount,
                        _userId,
                        _userIdAccused,
                        _content,
                        _documentFile,
                        _accusedContent,
                        _accusedDocumentFile,
                        _openDate,
                        _closeDate,
                        _verdict);

    emit SuitCreated(suitCount,
          _userId,
          _userIdAccused,
          _content,
          _documentFile,
          _accusedContent,
          _accusedDocumentFile,
          _openDate,
          _closeDate,
          _verdict);
  }

  function verdictGiven(uint256 _id, bytes32  _closeDate, bytes32  _verdict) public {
    Suit memory _suit = suits[_id];
    _suit.verdict = _verdict;
    _suit.closeDate = _closeDate;
    suits[_id] = _suit;
    emit SuitCompleted(_id, _suit.closeDate, _suit.verdict);
  }
}
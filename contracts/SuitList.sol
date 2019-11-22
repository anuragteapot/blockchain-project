pragma solidity ^0.5.0;

contract SuitList {
  uint256 public suitCount = 0;

  struct Suit {
    uint256 id;
    string suitId;
    string suitHash;
  }

  mapping(uint256 => Suit) public suits;

  event SuitCreated(
    uint256 id,
    string suitId,
    string suitHash
  );

  event SuitCompleted(
    uint256 id,
    string suitId,
    string suitHash
  );

  function createSuit(
    string memory suitId,
    string memory suitHash
  ) public {
    suitCount ++;
    suits[suitCount] = Suit(suitCount, suitId, suitHash);

    emit SuitCreated(suitCount, suitId, suitHash);
  }

  function updateHash(uint256 _id, string memory _suitId, string memory _suitHash) public {
    Suit memory _suit = suits[_id];
    _suit.suitId = _suitId;
    _suit.suitHash = _suitHash;
    suits[_id] = _suit;
    emit SuitCompleted(_id, _suit.suitId, _suit.suitHash);
  }
}
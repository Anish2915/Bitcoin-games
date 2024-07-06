// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArticleStorage {
    struct StockArticle {
        address owner;
        string[] tags;
        string content;
        uint256 visibleWords;
        uint256 price;
        uint256 dateUploaded;
        uint256 aiRating;
        uint256 userRating;
        address[] usersAllowed;
        uint256 startDate;
        uint256 endDate;
    }

    struct GeneralArticle {
        address owner;
        string[] tags;
        string content;
        uint256 visibleWords;
        uint256 price;
        uint256 dateUploaded;
        uint256 aiRating;
        uint256 userRating;
        address[] usersAllowed;
        int256 latitude;
        int256 longitude;
    }

    StockArticle[] public stocks;
    GeneralArticle[] public general;

    function storeStockArticle(
        string[] memory _tags, 
        string memory _content, 
        uint256 _visibleWords, 
        uint256 _price, 
        uint256 _aiRating, 
        uint256 _userRating, 
        uint256 _startDate,
        uint256 _endDate
    ) public {
        address[] memory emptyArray;

        StockArticle memory newStockArticle = StockArticle({
            owner: msg.sender,
            tags: _tags,
            content: _content,
            visibleWords: _visibleWords,
            price: _price,
            dateUploaded: block.timestamp,
            aiRating: _aiRating,
            userRating: _userRating,
            usersAllowed: emptyArray,
            startDate: _startDate,
            endDate: _endDate
        });

        stocks.push(newStockArticle);
    }

    function storeGeneralArticle(
        string[] memory _tags, 
        string memory _content, 
        uint256 _visibleWords, 
        uint256 _price, 
        uint256 _aiRating, 
        uint256 _userRating, 
        int256 _latitude,
        int256 _longitude
    ) public {
        address[] memory emptyArray;
        GeneralArticle memory newGeneralArticle = GeneralArticle({
            owner: msg.sender,
            tags: _tags,
            content: _content,
            visibleWords: _visibleWords,
            price: _price,
            dateUploaded: block.timestamp,
            aiRating: _aiRating,
            userRating: _userRating,
            usersAllowed: emptyArray,
            latitude: _latitude,
            longitude: _longitude
        });
        
        general.push(newGeneralArticle);
    }

    function getStockArticle(uint256 index) public view returns (
        address, 
        string[] memory, 
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        address[] memory,
        uint256,
        uint256
    ) {
        require(index < stocks.length, "Index out of bounds for stocks");
        StockArticle memory article = stocks[index];
        return (
            article.owner, 
            article.tags, 
            article.content, 
            article.visibleWords, 
            article.price, 
            article.dateUploaded, 
            article.aiRating, 
            article.userRating,
            article.usersAllowed,
            article.startDate,
            article.endDate
        );
    }

    function getGeneralArticle(uint256 index) public view returns (
        address, 
        string[] memory, 
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256,
        address[] memory,
        int256,
        int256
    ) {
        require(index < general.length, "Index out of bounds for general");
        GeneralArticle memory article = general[index];
        return (
            article.owner, 
            article.tags, 
            article.content, 
            article.visibleWords, 
            article.price, 
            article.dateUploaded, 
            article.aiRating, 
            article.userRating,
            article.usersAllowed,
            article.latitude,
            article.longitude
        );
    }

    function payForStockArticle(uint256 index) public payable {
        require(index < stocks.length, "Index out of bounds for stocks");
        StockArticle storage article = stocks[index];

        require(msg.value >= article.price, "Insufficient payment");

        payable(article.owner).transfer(msg.value);

        article.usersAllowed.push(msg.sender);
    }

    function payForGeneralArticle(uint256 index) public payable {
        require(index < general.length, "Index out of bounds for general");
        GeneralArticle storage article = general[index];

        require(msg.value >= article.price, "Insufficient payment");

        payable(article.owner).transfer(msg.value);

        article.usersAllowed.push(msg.sender);
    }
}

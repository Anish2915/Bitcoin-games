// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArticleStorage {
    struct StockArticle {
        uint index;
        address owner;
        string[] tags;
        string image;
        string content;
        uint256 visibleWords;
        uint256 price;
        uint256 dateUploaded;
        uint256 aiRating;
        uint256 userRating;
        uint256 startDate;
        uint256 endDate;
    }

    struct GeneralArticle {
        uint index;
        address owner;
        string[] tags;
        string image;
        string content;
        uint256 visibleWords;
        uint256 price;
        uint256 dateUploaded;
        uint256 aiRating;
        uint256 userRating;
        int256 latitude;
        int256 longitude;
    }

    StockArticle[] public stocks;
    GeneralArticle[] public general;

    mapping (address => int[]) public stockopt;
    mapping (address => int[]) public Generalopt;

    function storeStockArticle(
        string[] memory _tags, 
        string memory _image ,
        string memory _content, 
        uint256 _visibleWords, 
        uint256 _price, 
        uint256 _aiRating, 
        uint256 _userRating, 
        uint256 _startDate,
        uint256 _endDate
    ) public {

        StockArticle memory newStockArticle = StockArticle({
            index: stocks.length,
            owner: msg.sender,
            tags: _tags,
            image: _image,
            content: _content,
            visibleWords: _visibleWords,
            price: _price,
            dateUploaded: block.timestamp,
            aiRating: _aiRating,
            userRating: _userRating,
            startDate: _startDate,
            endDate: _endDate
        });

        stocks.push(newStockArticle);
    }

    function storeGeneralArticle(
        string[] memory _tags,
        string memory _image, 
        string memory _content, 
        uint256 _visibleWords, 
        uint256 _price, 
        uint256 _aiRating, 
        uint256 _userRating, 
        int256 _latitude,
        int256 _longitude
    ) public {
        GeneralArticle memory newGeneralArticle = GeneralArticle({
            index: general.length,
            owner: msg.sender,
            tags: _tags,
            image: _image,
            content: _content,
            visibleWords: _visibleWords,
            price: _price,
            dateUploaded: block.timestamp,
            aiRating: _aiRating,
            userRating: _userRating,
            latitude: _latitude,
            longitude: _longitude
        });
        
        general.push(newGeneralArticle);
    }

    function getStockArticle(uint256 index) public view returns (
        uint,
        address, 
        string[] memory, 
        string memory,
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256,
        uint256
    ) {
        require(index < stocks.length, "Index out of bounds for stocks");
        StockArticle memory article = stocks[index];
        return (
            article.index,
            article.owner, 
            article.tags, 
            article.image,
            article.content, 
            article.visibleWords, 
            article.price, 
            article.dateUploaded, 
            article.aiRating, 
            article.userRating,
            article.startDate,
            article.endDate
        );
    }

    function getGeneralArticle(uint256 index) public view returns (
        uint,
        address, 
        string[] memory, 
        string memory,
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        uint256, 
        uint256,
        int256,
        int256
    ) {
        require(index < general.length, "Index out of bounds for general");
        GeneralArticle memory article = general[index];
        return (
            article.index,
            article.owner, 
            article.tags, 
            article.image,
            article.content, 
            article.visibleWords, 
            article.price, 
            article.dateUploaded, 
            article.aiRating, 
            article.userRating,
            article.latitude,
            article.longitude
        );
    }

    function payForStockArticle(uint256 index) public payable {
        require(index < stocks.length, "Index out of bounds for stocks");
        StockArticle storage article = stocks[index];

        require(msg.value >= article.price, "Insufficient payment");

        // Using call to transfer Ether
        address payable owner = payable(article.owner);
        owner.transfer(article.price);

        stockopt[msg.sender].push(int(index));
    }


    function payForGeneralArticle(uint256 index) public payable {
        require(index < general.length, "Index out of bounds for general");
        GeneralArticle storage article = general[index];

        require(msg.value >= article.price, "Insufficient payment");

        address payable owner = payable(article.owner);
        owner.transfer(article.price);

        Generalopt[msg.sender].push(int(index));
    }

    function getStockOpt(address user) public view returns (int[] memory) {
        return stockopt[user];
    }

    function getGeneralOpt(address user) public view returns (int[] memory) {
        return Generalopt[user];
    }

    function getAllStockArticles() public view returns (StockArticle[] memory) {
        return stocks;
    }

    function getAllGeneralArticles() public view returns (GeneralArticle[] memory) {
        return general;
    }
}

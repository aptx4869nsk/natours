class APIFeactures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering 127.0.0.1:3000/api/v1/tours?duration[gte]=5&price[lt]=1500
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr)); // find({duration: {$gte:5},price: {$lt: 1500}})
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2) Sorting  127.0.0.1:3000/api/v1/tours?sort=price,ratingsAverage
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // {
  //   limit: '5',
  //   sort: '-ratingsAverage,price',
  //   fields: 'name,price,ratingsAverage,summary,difficulty'
  // }

  limitFields() {
    // 3) Field limit 127.0.0.1:3000/api/v1/tours?fields=name,duration,price
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // select('name duration price')
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // 4) Pagination 127.0.0.1:3000/api/v1/tours?page=2&limit=10
    const page = this.queryString.page * 1 || 1; // *1 convert string to int
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeactures;

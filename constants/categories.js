const categories = [
  {
    categoryName: "Transport",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/transport.svg",
  },
  {
    categoryName: "Products",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/products.svg",
  },
  {
    categoryName: "Health",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/health.svg",
  },
  {
    categoryName: "Alcohol",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/alcohol.svg",
  },
  {
    categoryName: "Entertainment",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/entertainment.svg",
  },
  {
    categoryName: "Housing",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/housing.svg",
  },
  {
    categoryName: "Technique",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/technique.svg",
  },
  {
    categoryName: "Communal, communication",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/communal.svg",
  },
  {
    categoryName: "Sports, hobbies",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/sports.svg",
  },
  {
    categoryName: "Education",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/education.svg",
  },
  {
    categoryName: "Other",
    categoryType: "expense",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/other.svg",
  },
  {
    categoryName: "Salary",
    categoryType: "income",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/salary.svg",
  },
  {
    categoryName: "Add. Income",
    categoryType: "income",
    categoryImageUrl:
      "https://kapusta-backend-827563b0830f.herokuapp.com/addincome.svg",
  },
];

const categoryNames = categories.map(({ categoryName }) =>
  categoryName.toLowerCase()
);

module.exports = categoryNames;

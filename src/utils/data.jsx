import { useTranslation } from "react-i18next";

const useData = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 10020,
      name: t("categories.childCategory.electronics"),
      path: "AllProducts",
    },
    {
      id: 10004,
      name: t("categories.childCategory.homeAppliances"),
      path: "AllProducts",
    },
    {
      id: 10014,
      name: t("categories.childCategory.clothes"),
      path: "AllProducts",
    },
    {
      id: 10003,
      name: t("categories.childCategory.accessories"),
      path: "AllProducts",
    },
    {
      id: 10013,
      name: t("categories.childCategory.shoes"),
      path: "AllProducts",
    },
    {
      id: 10012,
      name: t("categories.childCategory.beautyAndCare"),
      path: "AllProducts",
    },
    {
      id: 10009,
      name: t("categories.childCategory.health"),
      path: "AllProducts",
    },
    {
      id: 10018,
      name: t("categories.childCategory.homeGoods"),
      path: "AllProducts",
    },
    {
      id: 10016,
      name: t("categories.childCategory.constructionAndRepair"),
      path: "AllProducts",
    },
    {
      id: 10002,
      name: t("categories.childCategory.autoGoods"),
      path: "AllProducts",
    },
    {
      id: 10007,
      name: t("categories.childCategory.kidsGoods"),
      path: "AllProducts",
    },
    {
      id: 10008,
      name: t("categories.childCategory.hobbiesAndCreativity"),
      path: "AllProducts",
    },
    {
      id: 10015,
      name: t("categories.childCategory.sportsAndLeisure"),
      path: "AllProducts",
    },
    {
      id: 1821,
      name: t("categories.childCategory.foodProducts"),
      path: "AllProducts",
    },
    {
      id: 10005,
      name: t("categories.childCategory.householdChemicals"),
      path: "AllProducts",
    },
    {
      id: 10010,
      name: t("categories.childCategory.stationery"),
      path: "AllProducts",
    },
    {
      id: 10019,
      name: t("categories.childCategory.zooItems"),
      path: "AllProducts",
    },
    {
      id: 10011,
      name: t("categories.childCategory.booksCategory"),
      path: "AllProducts",
    },
    {
      id: 10006,
      name: t("categories.childCategory.dachaGarden"),
      path: "AllProducts",
    },
    {
      id: 12087,
      name: t("categories.childCategory.rehabilitationGoods"),
      path: "AllProducts",
    },
  ];

  return {
    categories,
  };
};

export default useData;

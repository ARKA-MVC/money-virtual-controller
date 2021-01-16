import {
  FormControl,
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

const categoryGroupName = {
  income: "Income",
  expense: "Expense",
  debtLoan: "Debt/Loan",
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "48px",
  },
  walletType: {
    marginBottom: theme.spacing(1),
  },
  walletList: {
    width: "100%",
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  walletName: {
    color: "#ff9600",
  },
  middleDiv: {
    flexGrow: "1",
    marginLeft: "15px",
    marginBottom: "0px",
  },
  lastDiv: {
    justifyItems: "end",
  },
  formInput: {
    minWidth: "233px",
    height: "100%",
  },
  formSelect: {
    // height: "100%",
  },
  label: {
    backgroundColor: "#424242",
  },
}));

const CategorySelect = (props) => {
  const allCategories = props.listCategories;
  const classes = useStyles();
  const handleSelectCategory = (event) => {
    const targetVal = event.target.value;
    console.log(targetVal);
    props.setState(targetVal !== undefined ? targetVal : "");
  };
  const renderListCategories = () => {
    let listCategories = [];
    for (const category in allCategories) {
      const subHeader = (
        <ListSubheader
          key={category}
          color="primary"
          disableSticky={true}
          inset
        >
          {categoryGroupName[category]}
        </ListSubheader>
      );
      listCategories.push(subHeader);
      if (allCategories[category].length > 0) {
        const itemCategory = allCategories[category].map((item, index) => {
          return (
            <MenuItem key={index} value={item.type.toString().match(/\b(\w)/g).join("")+"-"+item.id}>
              {item.name}
            </MenuItem>
          );
        });
        listCategories.push(itemCategory);
      }
    }
    return listCategories;
  };
  return (
    <FormControl
      className={classes.formInput}
      variant={props.variant || "standard"}
      disabled={props.disabled}
      required={props.required ? true : false}
      fullWidth
    >
      <InputLabel
        id="category-label"
        shrink={true}
        className={classes.label}
        htmlFor="grouped-category"
      >
        Category
      </InputLabel>
      <Select
        labelId="category-label"
        label="Category"
        autoWidth={true}
        id="grouped-category"
        value={props.state}
        onChange={handleSelectCategory}
        className={classes.formSelect}
        MenuProps={{
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              minWidth: "233px",
              maxHeight: 48 * 7.5,
              marginTop: "-5px"
            },
          }
        }}
      >
        {renderListCategories()}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;

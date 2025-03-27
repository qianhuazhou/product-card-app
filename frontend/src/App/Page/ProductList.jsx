import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      console.log("Fetched products:", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Card sx={{ position: "relative" }}>
              {}
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "white",
                  color: "red",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "darkred",
                  },
                  zIndex: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />

              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1" color="primary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;

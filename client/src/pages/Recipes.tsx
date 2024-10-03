"use client";

import React, { useState, useEffect } from "react";
import { Clock, Users, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import star from "../public/sparkler.png";

interface Recipe {
  id: string;
  name: string;
  description: string;
  cookTime: number;
  servings: number;
  image: string;
  ingredients: string[];
}

interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  image: string;
}

const RecipeCard: React.FC<Recipe> = ({
  name,
  description,
  cookTime,
  servings,
  image,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <Badge
              className="absolute top-2 right-2 bg-green-500 text-white"
              variant="secondary"
            >
              Uses expiring ingredients
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" /> {cookTime} mins
              </Badge>
              <Badge variant="secondary">
                <Users className="mr-1 h-3 w-3" /> {servings} servings
              </Badge>
            </div>
            <Link to={`/recipe-detail/${name}`}>
              <Button className="w-full mt-4" variant="link">
                View Recipe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([]);

  useEffect(() => {
    // Simulating fetching kitchen items
    const fetchedKitchenItems: KitchenItem[] = [
      {
        id: "1",
        name: "Fresh Milk",
        quantity: 2,
        expirationDate: "2024-10-05",
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "2",
        name: "Whole Grain Bread",
        quantity: 1,
        expirationDate: "2024-10-03",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "3",
        name: "Organic Eggs",
        quantity: 12,
        expirationDate: "2024-10-10",
        image:
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
    ];
    setKitchenItems(fetchedKitchenItems);

    // Simulating fetching recipes
    const fetchedRecipes: Recipe[] = [
      {
        id: "1",
        name: "Creamy Milk Bread Pudding",
        description: "A delicious dessert using milk and bread",
        cookTime: 45,
        servings: 4,
        image:
          "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        ingredients: [
          "Fresh Milk",
          "Whole Grain Bread",
          "Eggs",
          "Sugar",
          "Vanilla Extract",
        ],
      },
      {
        id: "2",
        name: "Fluffy Milk Bread",
        description: "Soft and fluffy bread made with fresh milk",
        cookTime: 180,
        servings: 8,
        image:
          "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        ingredients: ["Fresh Milk", "Flour", "Yeast", "Sugar", "Butter"],
      },
      {
        id: "3",
        name: "Egg and Milk Breakfast Casserole",
        description: "A hearty breakfast dish using eggs and milk",
        cookTime: 60,
        servings: 6,
        image:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        ingredients: ["Eggs", "Fresh Milk", "Cheese", "Bacon", "Bread"],
      },
    ];
    setRecipes(fetchedRecipes);
  }, []);

  const getExpiringItems = () => {
    const today = new Date();
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
    return kitchenItems.filter(
      (item) => new Date(item.expirationDate) <= threeDaysFromNow
    );
  };

  const expiringItems = getExpiringItems();

  const getRelatedRecipes = () => {
    const expiringItemNames = expiringItems.map((item) =>
      item.name.toLowerCase()
    );
    return recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        expiringItemNames.includes(ingredient.toLowerCase())
      )
    );
  };

  const relatedRecipes = getRelatedRecipes();

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="container mx-auto p-4 sm:p-6 pb-12 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-green-700 flex items-center">
            Recipe Suggestions
            <img
              src={star}
              className="w-6 h-6 ml-2" // Increased size and added margin-left
              alt="Star Icon" // Add an alt attribute for accessibility
            />
          </h1>
        </header>

        {expiringItems.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {expiringItems.map((item) => (
                  <Badge key={item.id} variant="default" className="rounded-xl">
                    {item.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {relatedRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </AnimatePresence>
            </div>

            {relatedRecipes.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No recipes found for expiring ingredients.
              </p>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <ChefHat className="mx-auto h-12 w-12 mb-4" />
            <p>No ingredients are expiring soon. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;

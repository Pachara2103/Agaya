const getCategoryById = async(url, id) => {
    try {
        const res = await fetch(`${url}/category/${id}`);
        if (!res.ok) {
             throw new Error("Failed to fetch Category");
        }
        const category = await res.json();
        return category;
    } catch (err) {
        throw new Error("Cannot get Category");
    }
}

const getCategories = async(url) =>  {
    try {
        const res = await fetch(`${url}/category/`);
        if (!res.ok) {
             throw new Error("Failed to fetch Categories");
        }
        const categories = await res.json();
        return categories;
    } catch (err) {
        throw new Error("Cannot get Categories");
    }
}

const createCategory = async(url, Categorydata) => {
    try {
        const response = await fetch(`${url}/category`, {
             method: "POST",
             headers: {
             "Content-Type": "application/json",
            },
             body: JSON.stringify(Categorydata), 
        });

        if (!response.ok) {
            throw new Error("Failed to create category");
        }
        const createdCatagory = await response.json();
        return createdCatagory;
    } catch (error) {
        throw new Error("Cannot create Categories");
    }
}

const editCategory = async(url, id, Categorydata) => {
    try {
        const response = await fetch(`${url}/category/${id}`, {
             method: "PUT",
             headers: {
             "Content-Type": "application/json",
            },
             body: JSON.stringify(Categorydata), 
        });

        if (!response.ok) {
            throw new Error("Failed to Edit category");
        }
        const editedCategory = await response.json();
        return editedCategory;
    } catch (error) {
        throw new Error("Cannot edit Categories");
    }
}

const deleteCategory = async(url, id) => {
    try {
        const response = await fetch(`${url}/category/${id}`, {
             method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to Delete category");
        }
        const deletedCategory = await response.json();
        return deletedCategory;
    } catch (error) {
        throw new Error("Cannot delete Categories");
    }
}

export { getCategoryById, getCategories, editCategory, createCategory, deleteCategory}
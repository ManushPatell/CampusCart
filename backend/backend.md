# Backend Architecture (Campus Cart)

This document will attempt to provide a description of the logic behind our backend. This documentation will serve to help anyone who may not be familiar with backend (me) and an excuse to reinforce my understanding :)

## Differences between Routes, Controllers, and Models

It's important to understand how the logic works between the three components because they're a fundamental part of how the backend operates.

### Routes: src/routes/\*.ts

These routes act as an entry point for HTTP requests. It will handle when a user requests to a path like (/users, /rentals/5), using a GET request. Routes will map a request to a specific controller function depending on what the user may need

```
router.get('/:id', getRentalByIdController);
```

Router will redirect traffic to a controller function "getRentalByIdController" if someone sends a GET request to "/users/:id"

### Controllers: src/controllers/\*.ts

Controllers are responsible for containing the business logic. These files contain functions that will run when a route is hit. The functions will decide what to do by talking to the model which fetches data from the database and sends a response with the data using `res.json()`

```
export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.user.id);
  if (!id) { //1. Validate the input
    res.status(400).json({ error: 'Id is required' });
    return;
  }

  let user;
  try {
    //2. Talk to the model (database)
    user = await findUserById(id);
  } catch (err) {
    next(err);
    return;
  }
// 3. Send a response
  if (!user) {
    res.status(500).json({ error: 'User not found!' });
    return;
  }
  res.status(200).json(user);
}
```

### Models (src/models/\*.ts)

Models are the only layer that will talk to the database. They hold SQL queries that will fetch, insert or update data. Models are simple:

1. They'll receive parameters from the controller
2. Run a SQL query with those values
3. Return the results as javascript objects or arrays

```
export interface Rental {
  id: number;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: string;
  cost: number;
  num_beds: number;
  is_cost_per_room: boolean;
  is_utilities_included: boolean;
  is_sublet: boolean;
  has_laundry: boolean;
  has_cooking: boolean;
  has_parking: boolean;
  no_smoking: boolean;
  is_shared: boolean;
}


export const findRentalById = async (id: string): Promise<Rental | null>  => {
  const result = await sql<Rental[]>`SELECT * FROM rentals WHERE id = ${id}`; //SQL query
  return result[0] ?? null;
};
```

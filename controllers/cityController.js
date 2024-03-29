import City from '../models/cityModel.js';

export const getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();

    res.status(200).json({
      status: 'success',
      length: cities.length,
      data: cities,
    });
  } catch (err) {
    next(err);
  }
};

export const getCity = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: city,
    });
  } catch (err) {
    next(err);
  }
};

export const createCity = async (req, res, next) => {
  try {
    const obj = { ...req.body };
    if (req.file) obj.image = req.file.filename;

    const newCity = await City.create(obj);

    res.status(201).json({
      status: 'success',
      data: newCity,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCity = async (req, res, next) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: city,
    });
  } catch (err) {
    next(err);
  }
};

export const delelteCity = async (req, res, next) => {
  try {
    await City.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

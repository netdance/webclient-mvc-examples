/* global define, describe, it */


define(function(require) {
	'use strict';

	describe('Models', function() {
		describe('CategoryModel', function() {
			var CategoryModel = require('CategoryModel');
			describe('it should have good defaults', function() {
				var categoryModel = new CategoryModel();
				it('should have default name of empty string', function() {
					var defaultName = categoryModel.get('name');
					defaultName.should.equal('');
				});
			});
		});
		describe('ProductModel', function() {
			var ProductModel = require('ProductModel');
			describe('it should have good defaults', function() {
				var productModel = new ProductModel();
				it('should have a default name of empty string', function() {
					var defaultName = productModel.get('name');
					defaultName.should.equal('');
				});
				it('should have a default price of zero', function() {
					var defaultPrice = productModel.get('price');
					defaultPrice.should.equal(0);
				});
				it('should have a default description of empty string', function() {
					var defaultDescription = productModel.get('description');
					defaultDescription.should.equal('');
				});
			});
		});
	});
});

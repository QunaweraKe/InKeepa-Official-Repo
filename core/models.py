from django.db import models
from django.contrib.auth import get_user_model
from django.utils.functional import cached_property
from django.template.defaultfilters import truncatechars
from PIL import Image
from django_fsm import FSMIntegerField, transition
import uuid


from core.utils import total_ammount_calculator

User = get_user_model()
# Create your models here.


class Country(models.Model):
    name = models.CharField(max_length=150)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class State(models.Model):
    name = models.CharField(max_length=150)
    country = models.ForeignKey("core.Country", on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Shop(models.Model):
    name = models.CharField(max_length=50)
    added_on = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=1500)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Item(models.Model):
    category = models.ForeignKey("core.Category", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(
        max_length=1000, editable=True, verbose_name="Description"
    )
    image = models.ImageField(upload_to="items", null=True, blank=True)
    price = models.PositiveSmallIntegerField()
    shop = models.ForeignKey("core.Shop", on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_on = models.DateTimeField(auto_now=True)
    available = models.BooleanField(default=True, verbose_name="Availability")
    soft_delete = models.BooleanField(default=False, editable=False)
    """Truncate in list display
    """

    @property
    def short_description(self):
        return truncatechars(self.description, 40)

    def save(self, *args, **kwargs):
        super(Item, self).save(*args, **kwargs)

        try:
            image_var = Image.open(self.image.path)
            if image_var.height > 450 or image_var.width > 450:
                output = (450, 450)
                image_var.thumbnail(output)
                image_var.save(self.image.path)
        except:
            pass

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Items/Products"


class Cart(models.Model):
    items = models.ManyToManyField(Item, related_name="cart_items", blank=True)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, related_name="cart", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

    @cached_property
    def total_ammount(self):
        calculated_total_ammount = total_ammount_calculator(self.items.all())
        return calculated_total_ammount

    @cached_property
    def all_items(self):
        return self.items.all()


class Order(models.Model):

    STATUS_CREATED = 0
    STATUS_FULFILLED = 1
    STATUS_CANCELLED = 2

    STATUS_CHOICES = (
        (STATUS_CREATED, "PENDING"),
        (STATUS_FULFILLED, "ACCEPTED"),
        (STATUS_CANCELLED, "CANCELLED"),
    )
    table_id = models.CharField(max_length=150, editable=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    items = models.ManyToManyField(Item, related_name="order_items", blank=True)
    total_ammount = models.PositiveSmallIntegerField(editable=False)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(User, related_name="orders", on_delete=models.CASCADE)
    status = FSMIntegerField(
        choices=STATUS_CHOICES, default=STATUS_CREATED, editable=True
    )

    class Meta:
        ordering = ["added_on"]
        verbose_name_plural = "All Orders"

    def __str__(self):
        return self.user.email

    @cached_property
    def all_items(self):
        return self.items.all()

    @transition(field=status, source=STATUS_CREATED, target=STATUS_FULFILLED)
    def fulfill_order(self):
        pass

    @transition(field=status, source=[STATUS_CREATED], target=STATUS_CANCELLED)
    def cancel_order(self):
        pass
